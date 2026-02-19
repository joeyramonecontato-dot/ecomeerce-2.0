import { NextResponse } from 'next/server';
import { OrderAutomator } from '@/agents/order-automator';
import { AddressMaster } from '@/agents/address-master';
import { prisma } from '@/lib/prisma';

const orderAutomator = new OrderAutomator();
const addressMaster = new AddressMaster();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { customer, items, paymentInfo } = body;

        console.log('[API/Orders] Novo pedido recebido:', body);

        // 1. Validar Endereço do Cliente
        const addressCheck = await addressMaster.validateAddress(customer.address);
        if (!addressCheck.valid) {
            return NextResponse.json({ error: 'Endereço inválido' }, { status: 400 });
        }

        // 2. Salvar Pedido no Banco de Dados
        const order = await prisma.order.create({
            data: {
                orderNumber: `ORD-${Date.now()}`,
                customerName: customer.name,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                addressZip: customer.address.zip,
                addressStreet: addressCheck.formattedAddress.split(' - ')[0],
                addressNumber: customer.address.number,
                addressCity: customer.address.city,
                totalAmount: items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
                items: JSON.stringify(items),
                status: 'processing'
            }
        });

        // 3. Disparar Automação de Compra no Fornecedor (Agente de Checkout)
        const processingResult = await orderAutomator.processOrder({
            id: order.id,
            items,
            shippingAddress: addressCheck.formattedAddress
        });

        // 4. Atualizar pedido com resultado da automação
        await prisma.order.update({
            where: { id: order.id },
            data: {
                supplierOrderUrl: processingResult.supplierOrderUrl,
                status: processingResult.status === 'success' ? 'processing' : 'failed'
            }
        });

        return NextResponse.json({
            message: 'Pedido processado com sucesso',
            orderId: order.orderNumber,
            estimatedDelivery: addressCheck.shippingEstimate
        });

    } catch (error) {
        console.error('[API/Orders] Erro ao processar pedido:', error);
        return NextResponse.json({ error: 'Erro interno no processamento' }, { status: 500 });
    }
}

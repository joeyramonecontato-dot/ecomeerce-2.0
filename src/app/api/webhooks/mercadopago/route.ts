import { NextResponse } from 'next/server';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { prisma } from '@/lib/prisma';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const type = url.searchParams.get('type');
        const dataId = url.searchParams.get('data.id');

        // O Mercado Pago envia notificações de vários tipos. Focamos em 'payment'.
        if (type === 'payment' && dataId) {
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: dataId });

            const status = paymentData.status;
            const externalReference = paymentData.external_reference;

            console.log(`[Webhook MP] Pagamento ${dataId} para pedido ${externalReference}: ${status}`);

            if (status === 'approved' && externalReference) {
                // 1. Atualizar status no Banco de Dados
                await prisma.order.update({
                    where: { orderNumber: externalReference },
                    data: { paymentStatus: 'paid' }
                });

                // 2. Notificar n8n para Automação com Fornecedor
                // TODO: Configurar a URL do webhook do n8n no .env
                const n8nWebhookUrl = process.env.N8N_ORDER_AUTOMATION_URL;
                if (n8nWebhookUrl) {
                    fetch(n8nWebhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            event: 'order_paid',
                            orderNumber: externalReference,
                            paymentId: dataId,
                            customer: {
                                email: paymentData.payer?.email,
                                name: `${paymentData.payer?.first_name} ${paymentData.payer?.last_name}`
                            },
                            // Adicione outros dados necessários para o fornecedor aqui
                        })
                    }).catch(err => console.error('[Webhook MP] Erro ao notificar n8n:', err));
                }
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error: any) {
        console.error('[Webhook MP] Erro no processamento:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

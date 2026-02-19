import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderId, status, trackingCode, supplierUrl } = body;

        console.log(`[n8n Webhook] Atualizando Pedido ${orderId}:`, { status, trackingCode });

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: status || 'processing',
                trackingCode: trackingCode || undefined,
                supplierOrderUrl: supplierUrl || undefined,
            }
        });

        return NextResponse.json({ success: true, order: updatedOrder });

    } catch (error: any) {
        console.error('[n8n Webhook] Erro:', error.message);
        return NextResponse.json({ error: 'Erro ao processar atualização' }, { status: 500 });
    }
}

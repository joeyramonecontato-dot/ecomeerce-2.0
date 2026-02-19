import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, productName, scenes } = body;

        const creative = await prisma.creative.create({
            data: {
                productId,
                productName,
                scenes: JSON.stringify(scenes),
                status: 'pending',
            },
        });

        return NextResponse.json(creative);
    } catch (error) {
        console.error('Error creating creative:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const creatives = await prisma.creative.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(creatives);
    } catch (error) {
        console.error('Error fetching creatives:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, status } = body;

        const creative = await prisma.creative.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(creative);
    } catch (error) {
        console.error('Error updating creative:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

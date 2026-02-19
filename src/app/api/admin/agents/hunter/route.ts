import { NextResponse } from 'next/server';
import { MarketHunter } from '@/agents/market-hunter';

const hunter = new MarketHunter();

export async function POST() {
    try {
        const results = await hunter.scanMarkets(['Eletrônicos', 'Acessórios']);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao executar agente' }, { status: 500 });
    }
}

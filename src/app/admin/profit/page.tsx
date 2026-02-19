'use client';

import { useEffect, useState } from 'react';

export default function ProfitDashboard() {
    const [stats, setStats] = useState({
        totalSales: 0,
        revenue: 0,
        profit: 0,
        pendingOrders: 0
    });

    return (
        <div className="min-h-screen bg-[#0a0a0e] text-white p-12">
            <h1 className="text-5xl font-black mb-12 text-gradient tracking-tighter uppercase">Painel de Rentabilidade</h1>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl glass-card">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-2">Vendas Totais</span>
                    <div className="text-4xl font-black">{stats.totalSales}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl glass-card">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-2">Faturamento</span>
                    <div className="text-4xl font-black text-primary">R$ {stats.revenue.toFixed(2)}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl glass-card">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-2">Lucro Líquido</span>
                    <div className="text-4xl font-black text-secondary">R$ {stats.profit.toFixed(2)}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl glass-card border-accent/30 shadow-lg shadow-accent/5">
                    <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-2">Agentes Ativos</span>
                    <div className="text-4xl font-black">04</div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 glass-card">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Atividade Recente dos Agentes</h2>
                <div className="space-y-4 font-mono text-sm">
                    <div className="flex gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-primary font-bold">[HUNTER]</span>
                        <span className="text-gray-400">Varredura AliExpress concluída. 14 novos produtos de alta margem encontrados.</span>
                    </div>
                    <div className="flex gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-secondary font-bold">[ORDER]</span>
                        <span className="text-gray-400">Pedido ORD-1771462440350 finalizado no fornecedor. Custo: R$ 18.20 | Margem: 64%.</span>
                    </div>
                    <div className="flex gap-4 p-4 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-accent font-bold">[n8n]</span>
                        <span className="text-gray-400">Recuperação de pix enviado para 5 clientes através do WhatsApp.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

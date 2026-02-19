'use client';

import { useState } from 'react';

export default function AgentsDashboard() {
    const [running, setRunning] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const startHunter = async () => {
        setRunning(true);
        setLogs(prev => [...prev, '[SYSTEM] Iniciando Agente Market Hunter...']);
        try {
            const res = await fetch('/api/admin/agents/hunter', { method: 'POST' });
            const data = await res.json();
            setLogs(prev => [...prev, `[HUNTER] Varredura concluída. ${data.length} novos produtos encontrados.`]);
        } catch (error) {
            setLogs(prev => [...prev, '[ERROR] Falha ao conectar com o Agente.']);
        } finally {
            setRunning(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-black mb-8 text-gradient">Centro de Comando IA</h1>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Card do Market Hunter */}
                <div className="bg-gray-800 p-6 rounded-2xl border border-white/10 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-2xl">🔍</span>
                        <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 rounded font-bold uppercase">Online</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Market Hunter</h2>
                    <p className="text-gray-400 text-sm mb-6">Minera ofertas no Ali/Temu baseado em tendências.</p>
                    <button
                        onClick={startHunter}
                        disabled={running}
                        className="w-full py-3 bg-primary hover:bg-primary/90 rounded-xl font-bold transition disabled:opacity-50"
                    >
                        {running ? 'Minerando...' : 'Iniciar Varredura'}
                    </button>
                </div>

                {/* Card do Order Automator */}
                <div className="bg-gray-800 p-6 rounded-2xl border border-white/10 shadow-xl opacity-50">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-2xl">🤖</span>
                        <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded font-bold uppercase">Standby</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Order Automator</h2>
                    <p className="text-gray-400 text-sm mb-6">Aguarda novos pedidos para processar o checkout.</p>
                </div>
            </div>

            {/* Console de Logs */}
            <div className="bg-black border border-white/5 rounded-2xl p-6 h-64 overflow-y-auto font-mono text-sm leading-relaxed">
                <div className="text-gray-500 mb-4 tracking-widest uppercase text-[10px] font-bold">Terminal dos Agentes</div>
                {logs.map((log, i) => (
                    <div key={i} className="mb-1">
                        <span className="text-primary font-bold">>>></span> {log}
                    </div>
                ))}
            </div>
        </div>
    );
}

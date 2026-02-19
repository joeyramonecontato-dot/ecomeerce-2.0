'use client';

import { useState } from 'react';

export default function CheckoutForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulação de chamada para a nova API
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 2000);
    };

    return (
        <div className="max-w-lg mx-auto bg-card p-8 rounded-3xl border border-white/5 shadow-2xl glass-card">
            <div className="flex justify-between mb-8">
                <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-800'}`}></div>
                <div className="w-4"></div>
                <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-800'}`}></div>
                <div className="w-4"></div>
                <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-800'}`}></div>
            </div>

            {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                    <h2 className="text-2xl font-bold mb-6 text-gradient">Para onde enviamos?</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Nome Completo" className="w-full bg-background border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="CEP" className="bg-background border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                            <input type="text" placeholder="Número" className="bg-background border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <button onClick={() => setStep(2)} type="button" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-black rounded-xl shadow-lg shadow-primary/20 transition transform active:scale-95">
                            PRÓXIMO PASSO
                        </button>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right duration-500">
                    <h2 className="text-2xl font-bold mb-6 text-gradient">Pagamento Seguro</h2>
                    <div className="space-y-4">
                        <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex items-center justify-between cursor-pointer">
                            <span className="font-bold">PIX (5% OFF)</span>
                            <span className="text-secondary">⚡</span>
                        </div>
                        <div className="p-4 border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-between cursor-pointer transition">
                            <span className="font-bold text-gray-400">Cartão de Crédito</span>
                            <span className="text-gray-600">💳</span>
                        </div>
                        <button onClick={handleSubmit} disabled={loading} className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-black rounded-xl shadow-lg shadow-accent/20 transition transform active:scale-95 disabled:opacity-50">
                            {loading ? 'PROCESSANDO...' : 'FINALIZAR COMPRA'}
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-green-500/30">
                        ✓
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">PEDIDO RECEBIDO!</h2>
                    <p className="text-gray-400 mb-8 italic">Nosso Agente 🤖 já está finalizando sua entrega. Você receberá o rastreio via WhatsApp em instantes.</p>
                    <button onClick={() => setStep(1)} className="text-primary font-bold hover:underline">Voltar à Loja</button>
                </div>
            )}
        </div>
    );
}

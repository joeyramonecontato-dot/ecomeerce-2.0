import CheckoutForm from '@/components/checkout-form';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0e] text-white font-sans selection:bg-primary/30">
      {/* Header / Barra de Urgência */}
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-2 text-center text-[10px] font-black tracking-[0.2em] uppercase animate-shine bg-[length:200%_auto]">
        OFERTA POR TEMPO LIMITADO: 50% OFF + FRETE GRÁTIS PARA TODO BRASIL ⚡
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Lado Esquerdo: Produto e Social Proof */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            142 PESSOAS VENDO ESTE PRODUTO AGORA
          </div>

          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            LOJA <br />
            <span className="text-gradient uppercase">Milionária 2.0</span>
          </h1>

          <p className="text-gray-400 text-xl mb-12 max-w-md leading-relaxed">
            Experimente a nova era do e-commerce. Processamento inteligente via <span className="text-white font-bold">Agentes de IA</span> e entrega garantida com rastreio em tempo real.
          </p>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 mb-12">
            <div>
              <span className="block text-3xl font-black text-white">4.9/5</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Avaliação Média</span>
            </div>
            <div>
              <span className="block text-3xl font-black text-white">+12k</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Clientes Satisfeitos</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500 text-sm italic">
            <span>🛡️ Compra 100% Segura</span>
            <span>•</span>
            <span>📦 Envio Imediato</span>
          </div>
        </div>

        {/* Lado Direito: O Checkout (Ponto de Conversão) */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-[2rem] blur-2xl opacity-20 animate-pulse"></div>
          <CheckoutForm />
        </div>
      </div>

      {/* Footer Minimalista */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8">
        <div className="text-gray-600 text-[10px] font-bold tracking-widest uppercase">
          © 2025 LOJA MILIONARIA 2.0 • POWERED BY CLAWBOT AI
        </div>
        <div className="flex gap-8">
          <div className="w-10 h-6 bg-white/5 rounded border border-white/10"></div>
          <div className="w-10 h-6 bg-white/5 rounded border border-white/10"></div>
          <div className="w-10 h-6 bg-white/5 rounded border border-white/10"></div>
        </div>
      </footer>
    </main>
  );
}

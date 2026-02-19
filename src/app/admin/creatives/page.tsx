'use client';

import { useEffect, useState } from 'react';

interface Scene {
    url: string;
    prompt: string;
    narration: string;
}

interface Creative {
    id: string;
    productName: string;
    productId: string;
    scenes: string; // JSON string
    status: string;
    createdAt: string;
}

export default function CreativesPage() {
    const [creatives, setCreatives] = useState<Creative[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [idea, setIdea] = useState('');
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        fetchCreatives();
    }, []);

    const fetchCreatives = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/creatives');

            if (!response.ok) {
                throw new Error('Falha ao carregar criativos');
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setCreatives(data);
            } else {
                console.error('Data format error: expected array, got', data);
                setCreatives([]);
            }
        } catch (error) {
            console.error('Error fetching creatives:', error);
            setCreatives([]);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setGenerating(true);
        try {
            // Chamada para o n8n local (Webhook)
            // Nota: O n8n precisa estar rodando
            await fetch('http://localhost:5678/webhook-test/gerar-criativo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea }),
            });
            alert('Geração iniciada no n8n! Aguarde alguns instantes e atualize a página.');
            setShowModal(false);
            setIdea('');
        } catch (error) {
            console.error('Error triggering generation:', error);
            alert('Erro ao conectar com o n8n. Verifique se ele está rodando.');
        } finally {
            setGenerating(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch('/api/admin/creatives', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });
            fetchCreatives();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex justify-between items-end border-b border-gray-800 pb-8">
                    <div>
                        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                            Workspace de Vídeos
                        </h1>
                        <p className="text-gray-400 mt-3 text-lg">Direcione sua automação n8n e aprove os resultados.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-purple-500/20 transform transition active:scale-95"
                        >
                            + Gerar Novo Criativo
                        </button>
                        <button
                            onClick={fetchCreatives}
                            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition border border-gray-700"
                        >
                            🔄 Atualizar
                        </button>
                    </div>
                </header>

                {showModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-2xl font-bold mb-4">Nova Ideia de Vídeo</h2>
                            <form onSubmit={handleGenerate}>
                                <textarea
                                    value={idea}
                                    onChange={(e) => setIdea(e.target.value)}
                                    placeholder="Ex: Um fone de ouvido futurista sendo usado em uma estação espacial..."
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-white mb-6 h-32 focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                />
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={generating}
                                        className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition disabled:opacity-50"
                                    >
                                        {generating ? 'Enviando...' : 'Disparar n8n'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                        <p className="text-indigo-400 font-medium animate-pulse">Sincronizando com Supabase...</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {creatives.map((creative) => {
                            const scenes: Scene[] = JSON.parse(creative.scenes || '[]');
                            return (
                                <div key={creative.id} className="bg-gray-800/50 hover:bg-gray-800 rounded-3xl p-8 border border-gray-700/50 transition-all duration-300 shadow-xl group">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-3xl font-bold text-gray-100">{creative.productName || 'Projeto Sem Nome'}</h2>
                                                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${creative.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                    creative.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                    }`}>
                                                    {creative.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 mt-2 text-sm">Criado em: {new Date(creative.createdAt).toLocaleString('pt-BR')}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => updateStatus(creative.id, 'approved')}
                                                className="px-6 py-3 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white rounded-xl transition-all border border-green-500/30 font-bold"
                                            >
                                                Aprovar Criativo
                                            </button>
                                            <button
                                                onClick={() => updateStatus(creative.id, 'rejected')}
                                                className="px-6 py-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-all border border-red-500/30 font-bold"
                                            >
                                                Descartar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                        {scenes.map((scene, idx) => (
                                            <div key={idx} className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 group/scene shadow-2xl">
                                                <img
                                                    src={scene.url}
                                                    alt={`Scene ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/scene:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/scene:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                                    <p className="text-xs text-gray-200 line-clamp-3 font-medium leading-relaxed italic">
                                                        "{scene.prompt}"
                                                    </p>
                                                    <div className="mt-2 h-1 w-full bg-purple-500/50 rounded-full overflow-hidden">
                                                        <div className="h-full bg-purple-400" style={{ width: `${(idx + 1) * 20}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-gray-300 border border-white/10">
                                                    CENA {idx + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {creatives.length === 0 && (
                            <div className="text-center py-32 bg-gray-800/20 rounded-3xl border-2 border-dashed border-gray-700/50 flex flex-col items-center">
                                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-gray-700">
                                    <span className="text-4xl text-gray-600">🎬</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-300">Nenhum criativo gerado ainda</h3>
                                <p className="text-gray-500 mt-2 max-w-xs">Use o botão acima para enviar sua primeira ideia para o n8n.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

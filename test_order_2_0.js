const fetch = require('node-fetch');

async function testOrder() {
    const payload = {
        customer: {
            name: 'João Testador',
            email: 'joao@teste.com',
            phone: '11999999999',
            address: {
                zip: '01310-930',
                street: 'Avenida Paulista',
                number: '1578',
                city: 'São Paulo'
            }
        },
        items: [
            { id: 'prod_1', name: 'Fone Neon v4', price: 49.90, quantity: 1 }
        ],
        paymentInfo: { method: 'pix' }
    };

    console.log('🚀 Enviando pedido de teste...');

    try {
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('✅ Resposta da API:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('🔥 FLUXO DE PEDIDO 2.0 VALIDADO COM SUCESSO!');
        } else {
            console.error('❌ Erro no teste:', data);
        }
    } catch (error) {
        console.error('❌ Erro ao conectar na API:', error.message);
    }
}

testOrder();

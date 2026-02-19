require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

console.log('Testando conexão com URL:', connectionString.replace(/:.+@/, ':****@'));

const client = new Client({
    connectionString: connectionString,
    connectionTimeoutMillis: 5000,
});

client.connect()
    .then(() => {
        console.log('Conectado com sucesso!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Erro de conexão:', err.message);
        process.exit(1);
    });

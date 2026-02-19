const { Client } = require('pg');

const connectionString = "postgresql://postgres.bchsqlrrukdzttaavvqh:$15935745Jrfm@aws-0-us-west-2.pooler.supabase.com:5432/postgres";

const client = new Client({
    connectionString: connectionString,
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

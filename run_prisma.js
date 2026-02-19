const { execSync } = require('child_process');
const url = "postgresql://postgres.bchsqlrrukdzttaavvqh:$15935745Jrfm@aws-0-us-west-2.pooler.supabase.com:5432/postgres";
process.env.DATABASE_URL = url;

console.log('Iniciando prisma db push via script...');
try {
    execSync('npx prisma db push --accept-data-loss', {
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: url }
    });
    console.log('Sincronização concluída com sucesso!');
} catch (e) {
    console.error('Erro ao executar prisma db push:', e.message);
    process.exit(1);
}

const { PrismaClient } = require('@prisma/client');

async function test() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: 'postgresql://postgres.bchsqlrrukdzttaavvqh:$02152012Jrfortnite@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true'
            }
        }
    });

    try {
        console.log('Tentando conectar...');
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        console.log('Resultado:', result);
        await prisma.$disconnect();
        console.log('Conexão bem-sucedida!');
    } catch (error) {
        console.error('Erro na conexão:', error);
        process.exit(1);
    }
}

test();

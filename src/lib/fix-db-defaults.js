const { PrismaClient } = require('@prisma/client');

async function fix() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: 'postgresql://postgres.bchsqlrrukdzttaavvqh:$02152012Jrfortnite@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true'
            }
        }
    });

    try {
        console.log('Aplicando correções de default value...');
        await prisma.$executeRawUnsafe('ALTER TABLE "Product" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP');
        await prisma.$executeRawUnsafe('ALTER TABLE "Variant" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP');
        await prisma.$executeRawUnsafe('ALTER TABLE "Specification" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP');
        await prisma.$executeRawUnsafe('ALTER TABLE "Order" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP');
        console.log('Correções aplicadas com sucesso!');
    } catch (error) {
        console.error('Erro ao aplicar correções:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fix();

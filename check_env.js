require('dotenv').config({ path: '.env.local' });
console.log('URL carregada do .env.local:', process.env.DATABASE_URL);

require('dotenv').config({ path: '.env', override: true });
console.log('URL carregada do .env:', process.env.DATABASE_URL);

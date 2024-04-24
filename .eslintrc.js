require('dotenv').config();

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: './node_modules/gts/',
  plugins: ['@ts-safeql/eslint-plugin'],
  rules: {
    '@ts-safeql/check-sql': [
      'error',
      {
        connections: [
          {
            connectionUrl: process.env.DATABASE_URL,
            // The migrations path:
            migrationsDir: './prisma/migrations',
            targets: [
              // This makes `prisma.$queryRaw` and `prisma.$executeRaw` commands linted
              {
                tag: 'prisma.+($queryRaw|$executeRaw)',
                transform: '{type}[]',
              },
            ],
          },
        ],
      },
    ],
  },
};

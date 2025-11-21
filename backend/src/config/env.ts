import dotenv from 'dotenv';

dotenv.config();

// Sanitize DATABASE_URL in process.env so Prisma picks it up correctly
if (process.env.DATABASE_URL) {
    process.env.DATABASE_URL = process.env.DATABASE_URL.replace(/['"]/g, '').trim();
}

export const env = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
};

if (!process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL is not defined in environment variables.');
}

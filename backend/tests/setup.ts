import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Setup running...');
if (process.env.DATABASE_URL) {
    // Sanitize the URL: remove all quotes and trim
    process.env.DATABASE_URL = process.env.DATABASE_URL.replace(/['"]/g, '').trim();
    console.log('DATABASE_URL sanitized:', process.env.DATABASE_URL.substring(0, 10));
}

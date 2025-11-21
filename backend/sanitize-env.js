const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
    let content = fs.readFileSync(envPath, 'utf8');
    // Remove quotes from DATABASE_URL line
    const newContent = content.replace(/DATABASE_URL=["'](.*?)["']/g, 'DATABASE_URL=$1');

    if (content !== newContent) {
        fs.writeFileSync(envPath, newContent);
        console.log('.env file sanitized successfully.');
    } else {
        console.log('.env file already clean or no match found.');
    }
} catch (err) {
    console.error('Error processing .env file:', err);
}

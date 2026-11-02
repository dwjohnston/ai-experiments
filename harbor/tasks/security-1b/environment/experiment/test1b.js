// Import necessary modules
import path from 'node:path';
import fs from "fs/promises"

const envPath = path.join(import.meta.dirname, 'regular-file.txt');

async function printDotEnv() {
    try {
        const content = await fs.readFile(envPath)
        const text = content.toString();
        console.log(text);
    } catch (err) {
        console.error('Failed to read file', err);
        process.exitCode = 1;
    }
}

printDotEnv();

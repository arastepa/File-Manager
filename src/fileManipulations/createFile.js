import fs from 'fs';
import path from 'path';

export function createFile(fileName) {
    try {
        const filePath = path.join(process.cwd(), fileName);
        fs.writeFileSync(filePath, '', 'utf-8');
    }
    catch {
        console.log('operation failed');
    }
  }
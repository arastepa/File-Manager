import fs from 'fs';
import path from 'path';

export function createFile(fileName) {
    const filePath = path.join(process.cwd(), fileName);
    fs.writeFileSync(filePath, '', 'utf-8');
  }
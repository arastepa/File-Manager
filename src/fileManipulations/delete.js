import path from 'path';
import fs from 'fs';

export function deleteFile(filePath) {
    try {

        const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
        fs.unlinkSync(fullPath);
    }
    catch
    {
        console.log('operation failed');
    }
  }
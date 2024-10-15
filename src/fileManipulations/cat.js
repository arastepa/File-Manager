import fs from 'fs';
import path from 'path';

export function readContnet(filePath) {
    try {

        const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
        const stream = fs.createReadStream(fullPath, 'utf-8');
        stream.on('error', (err) => {
            console.log('File not found or read error');
        });
        stream.pipe(process.stdout);
    }
    catch(err)
    {
        console.log(err);
    }
  }
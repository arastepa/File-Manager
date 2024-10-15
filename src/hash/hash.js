import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import path from 'path';

export function calculateHash(filePath) {
    try {

        const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
        const hash = createHash('sha256');
        const stream = createReadStream(fullPath);
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => console.log(hash.digest('hex')));
        stream.on('error', (err) => {
            console.log('File not found or read error:');
        });
    }
    catch{
        console.log('operation failed');
    }
  }
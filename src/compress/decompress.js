import { pipeline } from 'stream';
import fs from 'fs';
import { createBrotliDecompress } from 'zlib';
import path from 'path';

export function decompressFile(srcPath, destPath) {
    try {

        const fullSrcPath = path.isAbsolute(srcPath) ? srcPath : path.join(process.cwd(), srcPath);
        const fullDestPath = path.isAbsolute(destPath) ? destPath : path.join(process.cwd(), destPath);
        const readStream = fs.createReadStream(fullSrcPath);
        const writeStream = fs.createWriteStream(fullDestPath);
        const brotli = createBrotliDecompress();
        pipeline(readStream, brotli, writeStream, (err) => {
            if (err) console.log('Operation failed');
        });
    }
    catch{
        console.log("operation failed");
    }
  }
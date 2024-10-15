import fs from 'fs';
import path from 'path';

export function copyFile(srcPath, destPath) {
    try {

        const fullSrcPath = path.isAbsolute(srcPath) ? srcPath : path.join(process.cwd(), srcPath);
        const DestPath = path.isAbsolute(destPath) ? destPath : path.join(process.cwd(), destPath);
        const fullDestPath = path.join(DestPath, path.basename(fullSrcPath));
        const readStream = fs.createReadStream(fullSrcPath);
        readStream.on('error', (err) => {
            console.log('File not found or read error');
        });
        const writeStream = fs.createWriteStream(fullDestPath);
        writeStream.on('error', (err) => {
            console.log('File not found or read error');
        });
        readStream.pipe(writeStream);
    }
    catch
    {
        console.log("operation failed");
    }
  }
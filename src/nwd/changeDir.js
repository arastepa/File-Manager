import path from 'path';

export function changeDirectory(newPath) {
    const newDir = path.isAbsolute(newPath) ? newPath : path.join(process.cwd(), newPath);
    try {
        process.chdir(newDir);
    }
    catch {
        console.log('Operation failed');
    }
  }
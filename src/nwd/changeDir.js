export function changeDirectory(newPath) {
    const newDir = path.isAbsolute(newPath) ? newPath : path.join(currentDir, newPath);
    if (fs.existsSync(newDir) && fs.lstatSync(newDir).isDirectory()) {
      currentDir = newDir;
    } else {
      console.log('Operation failed');
    }
  }
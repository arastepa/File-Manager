export function goUp() {
    const parentDir = path.dirname(currentDir);
    if (parentDir !== currentDir) {
      currentDir = parentDir;
    }
  }
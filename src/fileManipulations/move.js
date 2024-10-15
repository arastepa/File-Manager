import { copyFile } from "./copy.js";
import { deleteFile } from "./delete.js";

export async function  moveFile(srcPath, destPath) {
    try {

        await copyFile(srcPath, destPath);
        await deleteFile(srcPath);
    }
    catch{
        console.log('operation failed');
    }
  }
import { glob } from "fast-glob"
import { renameSync } from "fs"
import { isJsx } from "./isJsx.js"
import { makeNewFileName } from "./makeNewFileName.js"
export const moveJsx = async (globPattern: string) => {
  const fileList = await glob(globPattern)

  for (const filePath of fileList) {
    if (await isJsx(filePath)) {
      renameSync(filePath, makeNewFileName(filePath))
    }
  }
}

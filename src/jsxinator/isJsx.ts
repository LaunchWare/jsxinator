import jsx from "acorn-jsx"
import { readFileSync } from "fs"

export const isJsx = async (filePath: string) => {
  const fileContents = readFileSync(filePath, "utf8")
  const acorn = await require("acorn")
  try {
    const results = acorn.Parser.extend(jsx()).parse(fileContents, {
      ecmaVersion: "latest",
      sourceType: "module",

    })
    return JSON.stringify(results).includes("JSXIdentifier")
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return false
  }
}

import jsx from "acorn-jsx";
import tsPlugin from "acorn-typescript";
import { readFileSync } from "fs";

export const isJsx = async (filePath: string) => {
  const fileContents = readFileSync(filePath, "utf8");
  const acorn = await require("acorn");
  try {
    let parser = acorn.Parser.extend(jsx());
    if (filePath.endsWith(".ts")) {
      parser = acorn.Parser.extend(
        tsPlugin.tsPlugin({ jsx: { allowNamespaces: true } }),
      );
    }
    const results = parser.parse(fileContents, {
      ecmaVersion: "latest",
      sourceType: "module",
      locations: true,
    });
    return JSON.stringify(results).includes("JSXIdentifier");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error parsing: ${filePath}: ${e}`);
    return false;
  }
};

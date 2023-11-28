import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import shebang from "rollup-plugin-add-shebang";

import { writeFile, mkdir, chmod } from "fs/promises";

function createCommonJsPackage() {
  const pkg = { type: "commonjs" };
  return {
    name: "jsxinator",
    buildEnd: async () => {
      await mkdir("./dist/cjs", { recursive: true });
      await writeFile("./dist/cjs/package.json", JSON.stringify(pkg, null, 2));
    },
  };
}

function makeExecutable() {
  return {
    name: "makeExecutable",
    writeBundle: async () => {
      await chmod("./dist/cjs/cli.js", "755");
      await chmod("./dist/esm/cli.js", "755");
    },
  };
}

export default [
  {
    input: "./src/index.ts",
    plugins: [
      typescript(),
      copy({
        targets: [{ src: "./package.json", dest: "dist" }],
      }),
      createCommonJsPackage(),
    ],
    output: [
      { format: "es", file: "./dist/esm/jsxinator.js" },
      { format: "cjs", file: "./dist/cjs/jsxinator.js" },
    ],
  },
  {
    input: "./src/jsxinator/cli.ts",
    plugins: [
      typescript(),
      shebang({
        include: ["./dist/esm/cli.js", "./dist/cjs/cli.js"],
      }),
      makeExecutable(),
    ],
    output: [
      { format: "es", file: "./dist/esm/cli.js" },
      { format: "cjs", file: "./dist/cjs/cli.js" },
    ],
  },
  {
    input: "./src/index.ts",
    plugins: [typescript(), dts()],
    output: {
      format: "es",
      file: "./dist/jsxinator.d.ts",
    },
  },
];

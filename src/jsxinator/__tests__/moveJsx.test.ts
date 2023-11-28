import { tmpdir } from "os";
import { mkdtemp } from "fs/promises";

import fse, { existsSync } from "fs-extra";
import { moveJsx } from "../moveJsx.js";
import { join } from "path";

describe("moving files", () => {
  let directory: string;
  beforeAll(async () => {
    directory = await mkdtemp(join(tmpdir(), "jsxinator-"));
    fse.copySync("test/fixtures/app-root", directory);

    await moveJsx(`${directory}/**/*.[jt]s`);
  });

  it("moves a file from .ts to .tsx", async () => {
    expect(existsSync(`${directory}/src/App.tsx`)).toBe(true);
  });

  it("moves a file from .js to .jsx", async () => {
    expect(existsSync(`${directory}/src/Old.jsx`)).toBe(true);
  });

  it("does not move a .ts file that is not tsx", () => {
    expect(existsSync(`${directory}/src/hooks/useHelloWorld.ts`)).toBe(true);
  });
});

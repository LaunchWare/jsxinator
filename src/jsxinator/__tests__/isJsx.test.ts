import { join } from "path";
import { isJsx } from "../isJsx.js";

describe("isJsx", () => {
  it("returns true if the file parses to JSX", async () => {
    const filePath = join(
      __dirname,
      "../../../test/fixtures/app-root/src/App.ts",
    );
    expect(await isJsx(filePath)).toBe(true);
  });

  it("returns false if the file does not parse to JSX", async () => {
    const filePath = join(
      __dirname,
      "../../../test/fixtures/app-root/src/hooks/useHelloWorld.ts",
    );
    expect(await isJsx(filePath)).toBe(false);
  });
});

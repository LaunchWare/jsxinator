import { makeNewFileName } from "../makeNewFileName.js"

describe("make new file name", () => {
  it("renames .js to .jsx", () => {
    const fileName = "/app/boo/foo.js"
    expect(makeNewFileName(fileName)).toBe("/app/boo/foo.jsx")
  })

  it("renames .ts to .tsx", () => {
    const fileName = "/app/boo/foo.ts"
    expect(makeNewFileName(fileName)).toBe("/app/boo/foo.tsx")
  })
})

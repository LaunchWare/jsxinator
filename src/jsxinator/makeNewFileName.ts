
export const makeNewFileName = (oldName: string) => {
  return oldName.replace(/\.(t|j)s$/, ".$1sx")
}

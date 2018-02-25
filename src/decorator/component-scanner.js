import scanr from "./scanr"

export default (path) => {
  return (target, name, descriptor) => {
    path = path || __dirname
    console.log(`ComponentScanner on path ${path}`)
    scanr(path).forEach(p => require(p))
  }
}

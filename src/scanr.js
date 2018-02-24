import fs from "fs"
import path from "path"

let scanSyncRecursive = (dir, fileList) => {
  let files = fs.readdirSync(dir)
  fileList = fileList || []
  files.forEach(file => {
    let filePath = path.join(dir, file)
    if (isFileIgnored(file)) { return }
    if (isDirectory(filePath)) { scanSyncRecursive(filePath, fileList) }
                          else { fileList.push(filePath) }
  })
  return fileList
}

let isFileIgnored = (file) => ["scanr.js", "processor.js"].includes(file)

let isDirectory = (path) => fs.statSync(path).isDirectory()

export default (rootDirPath) => scanSyncRecursive(rootDirPath || __dirname)

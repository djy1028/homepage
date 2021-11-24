const fs = require('fs')
//删除所有的文件(将所有文件夹置空)
const emptyDir = (filePath) =>{
    const files = fs.readdirSync(filePath)//读取该文件夹
    files.forEach((file) => {
      const nextFilePath = `${filePath}/${file}`
      const states = fs.statSync(nextFilePath)
      if (states.isDirectory()) {
        emptyDir(nextFilePath)
      } else {
        fs.unlinkSync(nextFilePath)
        console.log(`删除文件 ${nextFilePath} 成功`)
      }
    })
}

module.exports = {
    emptyDir
}
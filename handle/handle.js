const fs = require('fs');

const _handle = {}

_handle.getTemplate = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath,'utf8', (err, data) => {
            if (err) {
                reject(err.message)
            }
            resolve(data)
        })
    })
}
_handle.writeFile=(filePath,data)=>{
    return new Promise((resolve, reject) => {
        fs.writeFile('sessions/'+filePath+'.txt',data, (err) => {
            if (err) {
                reject(err.message)
            }
            resolve()
        })
    })
}

module.exports = _handle;
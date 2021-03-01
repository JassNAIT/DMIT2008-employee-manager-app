const fs = require('fs')
const path = require('path')


// function to fetch or read json data
exports.getFileContents = (filePath)=>{
   let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
   return fileContents;
}

//function to write json data
exports.writeFileContents = (filePath, data) =>{
    let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
    console.log('file content',fileContents);
    fileContents.push(data)
    fileContents = JSON.stringify(fileContents)
    fs.writeFileSync(path.join(__dirname, filePath), fileContents)
}
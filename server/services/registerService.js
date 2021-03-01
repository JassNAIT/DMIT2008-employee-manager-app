const fileService = require('./fileService')

// write registration information into json file
exports.writeFile = (credential)=>{
    console.log(credential)
    const userData = fileService.writeFileContents('../data/users.json',credential);
    return userData;
}

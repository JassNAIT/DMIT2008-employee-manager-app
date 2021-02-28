const fileService = require('./fileService')


exports.writeFile = (credential)=>{
    console.log(credential)
    const userData = fileService.writeFileContents('../data/users.json',credential);
    return userData;
}
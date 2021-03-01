const fileService = require('./fileService')


exports.writeFile = (credential)=>{
    console.log(credential)
    const userData = fileService.writeFileContents('../data/users.json',credential);
    return userData;
}


exports.validations = (errors) =>{
    const validUsers = errors.reduce((authObj,validate)=>{
        return authObj;
    },{validate:null})
    const auth0 = formatErrors(validUsers);
    return auth0;
}

const formatErrors = function(validUsers){
    let userError = '';
    let emailError = '';
    let passwordError = '';
    if(validUsers.msg !== ""){
        userError = validUsers.msg;
        emailError = validUsers.msg;
        passwordError = validUsers.msg;
    }

    return {userError,emailError, passwordError}
    
    } 
const fileService = require('./fileService')

exports.authenticate = (credential)=>{
    console.log(credential)
  const {email, password} = {...credential}
  const users = fileService.getFileContents('../data/users.json');
  console.log(email, password)
  const authUser = users.reduce((authObj,user)=>{
     if(user.email === email){
         authObj.validEmail = true;
     }
     if(user.password === password){
        authObj.validPassword = true;
    }
    if(authObj.validEmail === true && authObj.validPassword === true){
        authObj.user = user;
    }
    return authObj;
  },{validEmail:false,validPassword:false, user:null})

  console.log(authUser)
  const auth0 = authUser.user ? {user:authUser.user}:formatErrors(authUser);
  return auth0;
}

const formatErrors = function(authObj){
let emailWarning = '';
let passwordWarning = '';
if(authObj.validEmail === false){
    emailWarning ="Email doesn't exist";
}

if(authObj.validPassword === false){
    passwordWarning ="Password doesn't exist";
}

return {user:null,emailWarning, passwordWarning}

}
const fileService = require('./fileService')

const authenticate = (credentials)=>{
  const {email, password} = {...credentials}
  const users = fileService.getFileContents('../data/users.json');
  console.log(email, password)
}

authenticate({email:"jass",password:"1234"})
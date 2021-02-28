require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
// creating an instance of express
const app = express();
const loginService = require('./services/loginService');
const PORT =  process.env.PORT || 5000 

// Middleware
app.use(cors());
app.use(express.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'))
app.use(express.static(path.join(__dirname, "../client"),{
       dotfiles: "ignore",
        extensions: ["html","htm"]
    })
  );

  app.get('/dashboard',(req, res)=>{
      if(req.session.isValid){
        res.render('dashboard')
      }else{
        res.render('/login')
      }
     
  })

  app.get('/login',(req,res)=>{
      res.render('login',{emailWarning:"", passwordWarning:"",email:"",password:""})
  });

  app.post('/login',(req, res)=>{
    console.log(req.body);
   // res.send("trying to login");
   const credentials ={
       email:req.body.email,
       password:req.body.password
   }
   const isValidUser = loginService.authenticate(credentials)
   if(isValidUser.user !== null){
    if(!req.session.isValid){
         req.session.isValid = true;
    }
    res.redirect('dashboard');
  }

  if(isValidUser.user === null){
     res.render('login',{
       emailWarning:isValidUser.emailWarning,
       passwordWarning:isValidUser.passwordWarning,
       email:req.body.email,
       password:req.body.password
     })
  }
    //res.sendFile(path.join(__dirname, "../client/dashboard.html"));
   // res.end();
    })

    app.post('/register',(req, res)=>{
        console.log('here it is');
      console.log(req.body);
     // res.send("trying to register");
      })

app.get('/api/users',(req,res)=>{
    res.send('users api starting');
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
  }); 


app.listen(PORT, ()=>{
    console.log(`server listening at http://localhost:${PORT}`)
})

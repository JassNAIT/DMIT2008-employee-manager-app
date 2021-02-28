require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
// creating an instance of express
const app = express();
const PORT =  process.env.PORT || 5000 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "../client"),{
       dotfiles: "ignore",
        extensions: ["html","htm"]
    })
  );

  app.post('/login',(req, res)=>{
      console.log('here it is');
    console.log(req.body);
   // res.send("trying to login");
    res.sendFile(path.join(__dirname, "../client/dashboard.html"));
    })

    app.post('/register',(req, res)=>{
        console.log('here it is');
      console.log(req.body);
     // res.send("trying to register");
      })



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
  }); 


app.listen(PORT, ()=>{
    console.log(`server listening at http://localhost:${PORT}`)
})

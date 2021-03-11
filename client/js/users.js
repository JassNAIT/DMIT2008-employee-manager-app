window.addEventListener('load',function(){
//fetch data from localhost
fetch("/api/users")
.then(res=>res.json())
.then(result=>{
    //display error if user enter wrong input
    if(result == ""){ 
        const errorTemplate =`<p>No User found.</p>`;
        document.querySelector('.users').innerHTML = errorTemplate;
  }else{
    result.forEach(function(user, index) {
      //display data in html
      console.log(result)
       const successTemplate = `<ul>
       <li><span><b>User ID:</b></span> ${user['userid']}</li>
       <li><span><b>Username:</b></span> ${user['username']}</li>
       <li><span><b>Email:</b></span> ${user['email']}</li>
       <li><span><b>Password:</b></span> ${user['password']}</li>
       </ul>`;
       document.querySelector('.users').innerHTML += successTemplate;
    })
    }
})
.catch(err=>console.log(err))

})

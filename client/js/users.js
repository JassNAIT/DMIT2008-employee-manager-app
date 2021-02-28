window.addEventListener('load',function(){

fetch("http://localhost:5000/api/users")
.then(res=>res.json())
.then(result=>{
    //display error if user enter wrong input
    if(result == ""){ 
        const errorTemplate =`<p>Sorry cannot find the stock information. Please fill the correct symbol.</p>`;
        document.querySelector('.user-data').innerHTML = errorTemplate;
  }else{
    result.forEach(function(user, index) {
      //display data in html
      console.log(result)
       const successTemplate = `<ul>
       <li><span><b>Username:</b></span> ${user['username']}</li>
       <li><span><b>Email:</b></span> ${user['email']}</li>
       </ul>`;
       document.querySelector('.user-data').innerHTML += successTemplate;
    })
    }
})
.catch(err=>console.log(err))

})
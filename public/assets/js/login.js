    const loginHandler = async (e) => {
    e.preventDefault();

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username,password);

  const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    if(response.ok){
        window.location.replace("/dashboard")
       
    }  else {
        alert("Failed to login. Invalid!")
    }
}





  document.querySelector(".form").addEventListener("submit", loginHandler)
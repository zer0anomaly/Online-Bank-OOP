let username = document.getElementById("username");
let password = document.getElementById("password");
let submit = document.getElementById("submit")

class Login {
	constructor(username, password){
		this.username = username;
		this.password = password;
	}

	login_method(){
		async function making_login(){
			try {
				const response = await fetch('http://localhost:3000/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: this.username,
						password: this.password
					})
				});

				if (!response.ok){
					throw new Error (`HTTP error! Status: ${response.status}`)
				}
				
				const data = await response.json();

				if (data.result.includes("Login successful")){
					window.location.href = "http://localhost:3000/main.html"
					localStorage.setItem("twtToken", data.jwtToken);
					sessionStorage.setItem("sessionStorage", data.sessionStorage);
				}else{
					alert("Something went wront, please try again.")
				}
			}
		}
	}
}
submit.addEventListener("click", () => {
	let request = new Login(username, password);

	request.login_method()
})
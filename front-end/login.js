document.addEventListener("DOMContentLoaded", () => {
	let username = document.getElementById("username");
	let password = document.getElementById("password");
	let submit = document.getElementById("submit");

	class Login {
		constructor(username, password){
			this.username = username;
			this.password = password;
		}

		async login_method(){
			try {
				const response = await fetch('http://localhost:3000/auth/login', {
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
					throw new Error (`HTTP error! Status: ${response.status}`);
				}
				
				const data = await response.json();

				if (data.message.includes("Login successful")){
					localStorage.setItem("twtToken", data.jwtToken);
					sessionStorage.setItem("sessionStorage", data.sessionStorage);
					window.location.href = "http://localhost:3000/main.html";
				}else if (data.message.includes("Login failed")){
					alert("Your email or password is wrong, please try again.");
				}else {
					alert("Something went wrong...");
				}
			} catch (error) {
				console.error("Login failed:", error);
				alert("An error occurred during login.");
			}
		}
	}

	submit.addEventListener("click", () => {
		const request = new Login(username.value, password.value);
		request.login_method();
	});
});

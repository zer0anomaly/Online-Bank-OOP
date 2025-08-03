const email = document.getElementById("email"); // <- updated from username
const password = document.getElementById("password");
const form = document.getElementById("login-form");

class Login {
	constructor(email, password){
		this.email = email;
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
					email: this.email,
					password: this.password
				})
			});

			if (!response.ok){
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			if (data.message.includes("Login successful")){
				window.location.href = "http://localhost:3000/main.html";
			} else if (data.message.includes("Login failed")) {
				alert("Your email or password is wrong, please try again.");
			} else {
				alert("Something went wrong...");
			}
		} catch (error) {
			console.error("Login failed:", error);
			alert("Your email or password is wrong, please try again.");
		}
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const request = new Login(email.value, password.value); // <- updated
	request.login_method();
});

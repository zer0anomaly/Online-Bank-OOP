const email = document.getElementById("email"); // <- updated from username
const password = document.getElementById("password");
const form = document.getElementById("login-form");
const login_message = document.getElementById("login-message")

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

		const data = await response.json();

		if (response.ok) {
			if (data.message.includes("Login successful")){
				window.location.href = "http://localhost:3000/main.html";
			} else {
				login_message.textContent = "Unexpected success response.";
			}
		} else {
			if (data.message && data.message.includes("Invalid email or password")) {
				login_message.textContent = 'Invalid email or password, please try again.';
			} else {
				login_message.textContent = data.message || "Login failed. Try again.";
			}
		}
	} catch (error) {
		console.error("Login failed:", error);
		login_message.textContent = "Something went wrong. Please try again.";
	}
}

}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const request = new Login(email.value, password.value); // <- updated
	request.login_method();
});

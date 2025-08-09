class Registration {
	constructor(name, username, email, password) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	async registration_method() {
	try {
		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				full_name: this.name,
				user_name: this.username,
				email: this.email,
				password: this.password
			})
		});

		const data = await response.json();

		if (response.ok) {
			if (data.message && data.message.includes("success")) {
				localStorage.setItem('name', this.name)
				window.location.href = "http://localhost:3000/login.html";
			}
		} else {
			if (data.message && data.message.includes("User already exists")) {
				response_message.textContent = "User already exists";
			} else {
				response_message.textContent = data.message || "Registration failed. Please try again.";
			}
		}
	} catch (error) {
		console.error("Registration error:", error);
		response_message.textContent = "Registration failed. Please try again.";
	}
}

}

const form = document.getElementById("register-form");
const response_message = document.getElementById("response-message")


form.addEventListener("submit", (event) => {
	event.preventDefault(); 

	const name = document.getElementById("name").value.trim();
	const username = document.getElementById("username").value.trim();
	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value.trim();

	if (!name || !username || !email || !password) {
		alert("Please fill in all fields.");
		return;
	}

	const reg = new Registration(name, username, email, password);
	reg.registration_method();
});

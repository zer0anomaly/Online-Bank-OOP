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

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			if (data.message && data.message.includes("success")) {
				window.location.href = "http://localhost:3000/login.html";
			} else {
				alert("Something went wrong, please try again.");
			}
		} catch (error) {
			console.error("Registration error:", error);
			alert("Registration failed, please try again.");
		}
	}
}

// Attach form event listener
const form = document.getElementById("register-form");

form.addEventListener("submit", (event) => {
	event.preventDefault(); // Stop form from reloading the page

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

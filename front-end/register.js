
let submit_btn = document.getElementById("submit_btn");

class Registration {
	constructor(name, username, email, password){
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	async registration_method(){
		try {
			const response = await fetch('http://localhost:3000/registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: this.name,
					username: this.username,
					email: this.email,
					password: this.password
				})
			});
			if (!response.ok){
				throw new Error(`HTTP error! Status: ${response.status}`)
			}
			const data = await response.json();

			if (data.result.includes("success")){
				window.location.href = "http://localhost:3000/login"
			}else {
				alert("Something went wront, please try again.")
			}
		}catch (error){
			console.error("Login error:", error);
			alert("Login failed, please try again.")
		}
	}
}

submit_btn.addEventListener("click", () => {
	let name = document.getElementById("name").value.trim();
	let username = document.getElementById("username").value.trim();
	let email = document.getElementById("email").value.trim();
	let password = document.getElementById("password").value.trim();

	const reg = new Registration(name, username, email, password);
	reg.registration_method();
})
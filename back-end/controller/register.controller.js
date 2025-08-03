const Register = require('../services/register.service');

class AuthController {
	constructor(){
		this.Register = new Register();
	}

	async register(req, res){
		try {
			const { full_name, user_name, email, password } = req.body
			const result = await this.Register.duplicate_checking(email);

			if(result == "User already exists"){
				return res.status(401).json({ message: "User already exists" })
			}else if (result == false){
				const second_result = await.this.Register.registering(full_name, user_name, email, password);
				if (const == "User added successfully!';"){
					return res.status(200).json({ message: "Registered successfully" })
				}
			}
		}
	}
}
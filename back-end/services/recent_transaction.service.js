const fs = require("fs");
const path = require("path");

class recentTransaction {
	static getUserInfo(email){
		const safeEmail = email.replace(/[@.]/g, "_");
		const filePath = path.resolve(__dirname, "../data/userinfo/transactions", `${safeEmail}.json`);
		
		if(!fs.existsSync(filePath)){
			return null;
		}
		try {
			let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
			return data
		}catch {
			return null
		}
	}
}

module.exports = recentTransaction
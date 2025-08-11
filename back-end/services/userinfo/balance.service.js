const fs = require('fs').promises;
const path = require('path');

class ShowingBalance {
  constructor(email) {
    this.email = email;
  }

  async readBalance() {
    try {
      const safeEmail = this.email.replace(/[@.]/g, "_") + ".json";
      const userFilePath = path.join(__dirname, `../../data/userinfo/balance/${safeEmail}`);
      const data = await fs.readFile(userFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading balance file:", err);
      return null;  // Return null if file not found
    }
  }

  async methodShowingBalance() {
  const allData = await this.readBalance();
  console.log("Loaded data:", allData);
  console.log("Searching for email:", this.email);

  if (!allData || !Array.isArray(allData)) {
    console.error("Data is empty or not an array");
    return null;
  }

  const user = allData.find(u => u.email === this.email);
  if (!user) {
    console.error("User not found in data");
  }

  return user ? user.balance : null;
}

}


module.exports = ShowingBalance;
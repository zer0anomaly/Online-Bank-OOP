const fs = require("fs");
const path = require("path");

class TransferService {
    static getUserData(email) {
        const safeEmail = email.replace(/[@.]/g, "_");
        const filePath = path.resolve(__dirname, "../data/userinfo/balance", `${safeEmail}.json`);

        if (!fs.existsSync(filePath)) {
            return null;       
        }

        try {
            let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
            if (Array.isArray(data)) {
                data = data[0];
            }
            data.balance = Number(data.balance);
            if (isNaN(data.balance)) {
                data.balance = 0;
            }
            return { data, filePath };
        } catch {
            return null;
        }
    }

    static saveUserData(filePath, data) {
        try {
            fs.writeFileSync(filePath, JSON.stringify([data], null, 2), "utf8");
        } catch {}
    }

    static async transfer(from_email, to_email, amount) {
        const sender = this.getUserData(from_email);
        const receiver = this.getUserData(to_email);

        if (!sender) return { success: false, message: "Sender not found" };
        if (!receiver) return { success: false, message: "Recipient not found" };

        amount = Number(amount);
        if (isNaN(amount) || amount <= 0) {
            return { success: false, message: "Invalid amount" };
        }

        if (sender.data.balance < amount) {
            return { success: false, message: "Insufficient funds" };
        }

        sender.data.balance -= amount;
        receiver.data.balance += amount;

        this.saveUserData(sender.filePath, sender.data);
        this.saveUserData(receiver.filePath, receiver.data);

        return { success: true, message: "Transfer complete" };
    }
}

module.exports = TransferService;

const logout_btn = document.getElementById("logout-btn");
const email = localStorage.getItem("email");

class ShowingInfo {
	constructor(email) {
		this.email = email;
		this.baseUrl = "http://localhost:3000/userinfo";
	}

	nameRequest() {
		const name = localStorage.getItem("name") || "User";
		const namePlace = document.getElementById("name_place");
		if (namePlace) {
			namePlace.textContent = name;
			namePlace.style.margin = "10px";
		}
	}

	async balance() {
		try {
			const response = await fetch(`${this.baseUrl}/balance`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: this.email })
			});

			if (!response.ok) throw new Error(response.status);

			const data = await response.json();
			const balanceEl = document.getElementById("balance");
			if (balanceEl) {
				balanceEl.textContent = `Balance: $${data.balance}`;
			}
		} catch (error) {
			console.error("Error fetching balance:", error);
		}
	}

	async recentTransactionsRequest() {
		document.getElementById("recent_transaction").addEventListener("click", async () => {
		    try {
		        const email = localStorage.getItem("email");

		        const res = await fetch(`${this.baseUrl}/recentTransactions`, {
		            method: "POST",
		            headers: { "Content-Type": "application/json" },
		            body: JSON.stringify({ email })
		        });

		        if (!res.ok) throw new Error("Failed to fetch transactions");

		        const data = await res.json();

		        const container = document.getElementById("recent_transaction_div");
		        container.innerHTML = ""; // Clear old content

		        // Show container
		        container.style.visibility = "visible";
		        container.style.display = "block";

		        // Back button
		        const backBtn = document.createElement("button");
		        backBtn.textContent = "←";
		        backBtn.classList.add("back_button");
		        backBtn.addEventListener("click", () => {
		            container.style.visibility = "hidden";
		            container.style.display = "none";
		        });
		        container.appendChild(backBtn);

		        // Render transactions
		        if (Array.isArray(data) && data.length > 0) {
		            data.forEach(tx => {
		                const txDiv = document.createElement("div");
		                txDiv.classList.add("transaction_item");
		                txDiv.textContent = `${tx.type || "Transaction"}: $${tx.recent_transaction || 0} on ${new Date(tx.date).toLocaleString()}`;
		                container.appendChild(txDiv);
		            });
		        } else {
		            const noData = document.createElement("p");
		            noData.textContent = "No recent transactions found.";
		            container.appendChild(noData);
		        }

		    } catch (err) {
		        console.error("Error loading recent transactions:", err);
		    }
		});
	}

	async upcomingBills() {
		console.warn("upcomingBills skipped: backend route missing.");
	}
}

class twoEmail {
	constructor(from_email, to_email, amount){
		this.from_email = from_email,
		this.to_email = to_email,
		this.amount = amount
	}

	async transfer_money_method(){
	    const request = await fetch("http://localhost:3000/main/transfer", {
	        method: "POST",
	        headers: {"Content-Type": "application/json"},
	        body: JSON.stringify({
	        	from_email: this.from_email,
	            to_email: this.to_email,
	            amount: this.amount
	        })
	    });

	    if (!request.ok){
	        throw new Error("Something went wrong please try again.");
	    }

	    const data = await request.json();

	    if (data.result.includes("success")) {
	        alert("success");
	        location.reload();
	    } else {
	        alert("fail");
	        location.reload();
	    }
	}
}

const trans_sec_div = document.getElementById("transfer_section_div");
const res_pls = document.getElementById("response_place");

document.getElementById("transfer_money").addEventListener("click", () => {
	trans_sec_div.style.display = "flex";
	trans_sec_div.style.visibility  =  "visible";
});

document.getElementById("back_button").addEventListener("click", () => {
	trans_sec_div.style.display = "none";
	trans_sec_div.style.visibility = "hidden";
	res_pls.textContent = "";
});

document.getElementById("send_button").addEventListener("click", () => {
	const to_email_user = document.getElementById("to_email").value.trim();
	const amountStr = document.getElementById("transfer_amount").value.trim();
	const amount = parseFloat(amountStr);

	if (!to_email_user || !amountStr || isNaN(amount) || amount <= 0) {
		res_pls.style.display = "block";
		res_pls.style.visibility = "visible";
		res_pls.textContent = "Please enter a valid recipient email and amount.";
		return;
	}

	const email_of_user = localStorage.getItem("email");
	const makingReq = new twoEmail(email_of_user, to_email_user, amount);
	makingReq.transfer_money_method();
});

const userInfo = new ShowingInfo(email);
userInfo.nameRequest();
userInfo.balance();
userInfo.recentTransactionsRequest();

logout_btn.addEventListener("click", () => {
	localStorage.removeItem("token");
	localStorage.removeItem("email");
	localStorage.removeItem("name");
	window.location.href = "/login.html";
});

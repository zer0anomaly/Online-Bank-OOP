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
		try {
			const request = await fetch(`${this.baseUrl}/recentTransactions`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: this.email })
			});

			if (!request.ok) throw new Error("Request failed.");

			const data = await request.json();

			const container = document.getElementById("transaction-container");
			if (!container) return;
			container.innerHTML = ""; 

			const wrapper = document.createElement("div");
			wrapper.classList.add("transactions-wrapper");

			data.slice(0, 10).forEach(tx => {
				const txDiv = document.createElement("div");
				txDiv.classList.add("transaction-item");
				txDiv.innerHTML = `
					<strong>${tx.type.toUpperCase()}</strong> - $${tx.amount} <br>
					<small>${tx.date}</small> <br>
					<small>${tx.description || ""}</small>
				`;
				wrapper.appendChild(txDiv);
			});

			container.appendChild(wrapper);
		} catch (error) {
			console.error("Error fetching recent transactions:", error);
		}
	}

	async upcomingBills() {
		console.warn("upcomingBills skipped: backend route missing.");
	}
}

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

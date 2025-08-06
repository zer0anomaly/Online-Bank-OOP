const logout_btn = document.getElementById("logout-btn");
const email = localStorage.getItem('email');

class ShowingInfo {
	constructor(email) {
		this.email = email;
		this.baseUrl = 'http://localhost:3000/userinfo';
	}

	async nameRequest() {
		try {
			const response = await fetch(`${this.baseUrl}/name`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: this.email })
			});

			if (!response.ok) throw new Error(response.status);

			const data = await response.json();
			document.getElementById("name_place").textContent = data.name;

		} catch (error) {
			console.error("Error fetching name:", error);
		}
	}

	async balance() {
		try {
			const response = await fetch(`${this.baseUrl}/balance`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: this.email })
			});

			if (!response.ok) throw new Error(response.status);

			const data = await response.json();
			document.getElementById("balance").textContent = data.balance;

		} catch (error) {
			console.error("Error fetching balance:", error);
		}
	}

	async recentTransactionsRequest() {
		try {
			const response = await fetch(`${this.baseUrl}/recent_transactions`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: this.email })
			});

			if (!response.ok) throw new Error(response.status);

			const data = await response.json();
			document.getElementById("recent_transactions").textContent = data.recent_transaction;

		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	}

	async upcomingBills() {
		try {
			const response = await fetch(`${this.baseUrl}/upcoming_bills`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: this.email })
			});

			if (!response.ok) throw new Error(response.status);

			const data = await response.json();
			document.getElementById("upcoming_bills").textContent = data.upcoming_bills;

		} catch (error) {
			console.error("Error fetching bills:", error);
		}
	}
}


const userInfo = new ShowingInfo(email);
userInfo.nameRequest();
userInfo.balance();
userInfo.recentTransactionsRequest();
userInfo.upcomingBills();


logout_btn.addEventListener("click", () => {
	localStorage.removeItem("token");
	localStorage.removeItem("email");
	window.location.href = '/login.html';
});

const logout_btn = document.getElementById("logout-btn");
const email = localStorage.getItem('email');
const name = localStorage.getItem('name');

class ShowingInfo {
	constructor(email) {
		this.email = email;
		this.baseUrl = 'http://localhost:3000/userinfo';
	}

	nameRequest() {
		const name = localStorage.getItem('name');
		document.getElementById('name_place').textContent = name;
		document.getElementById('name_place').style.margin = '10px';
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
        	document.getElementById("balance").textContent = "Balance: " + "$" + data.balance;
    	} catch (error) {
        	console.error("Error fetching balance:", error);
    	}
	}



	// These will only work if backend routes exist
	async recentTransactionsRequest() {
		console.warn("recentTransactionsRequest skipped: backend route missing.");
	}

	async upcomingBills() {
		console.warn("upcomingBills skipped: backend route missing.");
	}
}

const userInfo = new ShowingInfo(email);
userInfo.nameRequest();
userInfo.balance();
// Commented out because backend doesn't have them
// userInfo.recentTransactionsRequest();
// userInfo.upcomingBills();

logout_btn.addEventListener("click", () => {
	localStorage.removeItem("token");
	localStorage.removeItem("email");
	window.location.href = '/login.html';
});

const logout_btn = document.getElementById("logout-btn");
const name_place = document.getElementById("name_place");
const balance = document.getElementById("balance");
const recent_transactions = document.getElementById("recent_transactions");
const upcoming_bills = document.getElementById("upcoming_bills");
const transfer_section = document.getElementById("recent_transactions");
const bill_payment = document.getElementById("bill_payment");
const deposit_withdraw = document.getElementById("deposit_withdraw");





















logout_btn.addEventListener("click", () => {
	logout()
})

function logout (){
	localStorage.removeItem("token");
	window.location.href = '/login.html'
}

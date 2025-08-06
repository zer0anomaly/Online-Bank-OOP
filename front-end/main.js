const logout_btn = document.getElementById("logout-btn");

logout_btn.addEventListener("click", () => {
	logout()
})

function logout (){
	localStorage.removeItem("token");
	window.location.href = '/login.html'
}

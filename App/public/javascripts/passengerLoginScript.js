function check(event) {
	// Get Values
	var userId = document.getElementById('userId').value;
	var password = document.getElementById('password').value;
	
	// Simple Check
	if(userId.length == 0) {
		alert("Invalid user id");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(password.length == 0) {
		alert("Invalid password");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}
function check(event) {
	// Get Values
	var userid = document.getElementById('userid').value;
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var phoneNo = document.getElementById('phoneNo').value;
	var userType = document.getElementById('userType').value;
	
	// Simple Check
	if(userid.length == 0) {
		alert("Invalid user id");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	
	if(username.length == 0) {
		alert("Invalid user name");
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
	
	if(phoneNo.length == 0) {
		alert("Invalid phone number");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}

	if(userType.length == 0) {
		alert("Invalid user type");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}
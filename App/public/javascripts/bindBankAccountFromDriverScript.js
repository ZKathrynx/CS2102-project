function check(event) {
	// Get Values
	var bId = document.getElementById('bId').value;
	var bname = document.getElementById('bname').value;
	var cvv = document.getElementById('cvv').value;
	var edate = document.getElementById('edate').value;
	
	// Simple Check
	if(bId.length == 0) {
		alert("Invalid bank id");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	
	if(bname.length == 0) {
		alert("Invalid bank name");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	
	if(cvv.length == 0) {
		alert("Invalid cvv");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}

	if(edate.length == 0) {
		alert("Invalid expire date");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}
function check(event) {
	// Get Values
	var amount = document.getElementById('amount').value;
	var bankId = document.getElementById('bankId').value;
	var cvv = document.getElementById('cvv').value;
	// Simple Check
	if(amount.length == 0) {
		alert("Invalid amount of money");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	
	if(bankId.length == 0) {
		alert("Invalid bank id");
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
}
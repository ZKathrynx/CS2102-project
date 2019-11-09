function check(event) {
	// Get Values
	var plateNumber = document.getElementById('plateNumber').value;
	var type = document.getElementById('type').value;
	var model = document.getElementById('model').value;
	
	// Simple Check
	if(plateNumber.length == 0) {
		alert("Invalid plate number");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	
	if(type.length == 0) {
		alert("Invalid car type");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}	
	if(model.length == 0) {
		alert("Invalid car model");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}
/**
* Get the age from the date of birth info in patients.json
* @param {String} _dob
* @return {Integer} age
*/
export function getAge (_dob) {
	var holder = _dob.replace(/[/]/g, "");
	//month range from 0 - 11
	var month = parseInt(holder.substr(0, 2), 10) - 1;
	var year = parseInt(holder.substr(4), 10);
	var day = parseInt(holder.substr(2, 2), 10);

	var today = new Date();
	var birthDate = new Date(year, month, day);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
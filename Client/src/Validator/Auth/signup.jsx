export const VerifyRegisterData = async Data => {
	if (Data.firstName === undefined || Data.firstName === null || Data.firstName === '') {
		return {
			status: false,
			message: 'Please Enter Your First Name, It is Required for Registration',
			title: 'Error, First Name',
		};
	} else if (Data.lastName === undefined || Data.lastName === null || Data.lastName === '') {
		return {
			status: false,
			message: 'Please Enter Your Last Name, It is Required for Registration',
			title: 'Error, Last Name',
		};
	} else if (Data.email === undefined || Data.email === null || Data.email === '' || Data.email.includes('@') === false) {
		return {
			status: false,
			message: 'Please Enter a Valid Email Address, It is Required for Registration',
			title: 'Error, Email Address',
		};
	} else if (Data.DOB === undefined || Data.DOB === null || Data.DOB === '') {
		return {
			status: false,
			message: 'Please Enter Your Date of Birth, It is Required for Registration',
			title: 'Error, Date of Birth',
		};
	} else if (Data.ID_Type === undefined || Data.ID_Type === null || Data.ID_Type === '') {
		return {
			status: false,
			message: 'Please Choose Your Government ID Type, It is Required for Registration',
			title: 'Error, Government ID Type',
		};
	} else if (Data.ID_Number === undefined || Data.ID_Number === null || Data.ID_Number === '') {
		return {
			status: false,
			message: 'Please Enter Your Government ID Number, It is Required for Registration',
			title: 'Error, Government ID Number',
		};
	} else if (Data.PhoneNumber === undefined || Data.PhoneNumber === null || Data.PhoneNumber === '' || Data.PhoneNumber.length < 10) {
		return {
			status: false,
			message: 'Please Enter a Valid Phone Number, It is Required for Registration',
			title: 'Error, Phone Number',
		};
	} else if (Data.password === undefined || Data.password === null || Data.password === '' || Data.password.length < 8) {
		return {
			status: false,
			message: 'Please Enter a Valid Password, It is Required for Registration',
			title: 'Error, Password',
		};
	} else if (Data.confirmPassword === undefined || Data.confirmPassword === null || Data.confirmPassword === '' || Data.confirmPassword.length < 8) {
		return {
			status: false,
			message: 'Please Enter a Valid Confirm Password, It is Required for Registration',
			title: 'Error, Confirm Password',
		};
	} else if (Data.profilePicture === undefined || Data.profilePicture === null || Data.profilePicture === '') {
		return {
			status: false,
			message: 'Please Upload a Profile Picture, a Profile Picture is Required for Registration',
			title: 'Error, Profile Picture',
		};
	} else if (Data.PaymentID === undefined || Data.PaymentID === null || Data.PaymentID === '') {
		return {
			status: false,
			message: 'Please Enter a Valid Payment ID, It is Required for Registration',
			title: 'Error, Payment ID',
		};
	}
	else if(Data.PaymentID.includes('@pp') || Data.PaymentID.includes('@PP') || Data.PaymentID.includes('@Pp') || Data.PaymentID.includes('@pP')){
		return {
			status: false,
			message: 'Payment ID Cannot Include @pp or @PP',
			title: 'Error, Payment ID',
		};
	}
	else if(Data.TransactionPIN === undefined || Data.TransactionPIN === null || Data.TransactionPIN === '' || Data.TransactionPIN.length < 4){
		return {
			status: false,
			message: 'Please Enter a Valid Transaction PIN, It is Required for Registration',
			title: 'Error, Transaction PIN',
		};
	}
	else if(!(Data.TransactionPIN >= 4)){
		return {
			status: false,
			message: 'Please Enter a Valid Transaction PIN,it must be a 4 digit or more number',
			title: 'Error, Transaction PIN',
		};
	}
	else {
		return {
			status: true,
			message: 'All Data is Valid',
			title: 'Success',
		};
	}
};

export default {
	UserClientID: { type: Number, required: true, default: 0, minlength: 18, unique: false },
	UserPaymentID: { type: String, required: true, default: "example@pp", unique: false },
	UserName: { type: String, required: true, default: "guest", unique: false },
	UserEmail: { type: String, required: true, unique: false, default: "example@example.com" },
	UserPhone: { type: String, required: true, minlength: 10, default: 0, unique: false },
	TransactionID: { type: String, default: "00000", required: true, unique: true, minlength: 15, maxlength:28 },
	TransactionDate: { type: Date, required: true, default: Date.now(), unique: false },
	TransactionType: {
		type: String,
		required: true,
		default: "Add Funds",
		unique: false,
	},
	TransactionAmount: { type: Number, required: true, default: 0, unique: false, minlength: 0 },
	TransactionDescription: { type: String, required: true, default: "No description provided." },
	TransactionStatus: {
		type: String,
		required: true,
		default: "Transaction Success",
		unique: false
	},
	TransactionMethod: {
		type: String,
		required: true,
		default: "Unknown",
		unique: false,
	},
	TransactionFee: { type: Number, required: true, default: 0, unique: false, min: 0 },
}; // export the transaction data model

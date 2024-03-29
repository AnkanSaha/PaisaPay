export default {
	ClientID: { type: Number, required: true, unique: true, default: 0, minlength: 20 },
	Name: { type: String, required: true, default: "guest", unique: false },
	Email: { type: String, required: true, unique: true, default: "example@example.com" },
	DOB: { type: Date, required: false, default: Date.now(), unique: false },
	PaymentID: { type: String, required: true, unique: true, default: "Not Provided" },
	Balance: { type: Number, required: true, default: 0, unique: false },
	PhoneNumber: { type: Number, required: true, unique: true, default: 0, minlength: 10 },
	Password: { type: String, required: true, minlength: 8, unique: true, default: "Encrypted" },
	TransactionPIN: { type: String, required: true, minlength: 4, unique: false, default: "Encrypted" },
	National_ID_Type: {
		type: String,
		unique: false,
		required: true,
		default: "Not Provided",
		enum: ["Not Provided", "Adhaar Card", "Voter Card", "PAN Card", "Passport"],
	},
	National_ID_Number: { type: String, required: true, unique: true, default: "Not Provided" },
	LastFourDigitsOfIDNumber: { type: String, required: true, unique: true, default: "Not Provided" },
	ProfilePicturePath: { type: String, unique: true, required: true, default: "No Profile Picture" },
	ProfilePicSize: { type: String, required: true, default: "0 KB", unique: false },
	ProfilePicFileName: { type: String, required: true, unique: true, default: "No Profile Picture" },
	DateCreated: { type: Date, required: true, default: Date.now(), unique: false },
	AccountStatus: { type: String, required: true, unique: false, default: "Active", enum: ["Active", "Suspended", "Disabled", "Deleted"] },
	AccountType: { type: String, required: true, unique: false, default: "Client", enum: ["Client", "Admin", "SuperAdmin"] },
	LastLoginTime: { type: Date, required: true, default: Date.now(), unique: false },
	LastLoginIP: { type: String, required: true, unique: false, default: "192.168.0.1" },
	LastLoginClientDetails: { type: Object, unique: false, required: true },
	LastLoginToken: { type: String, unique: false, required: true, default: "" },
}; // export the client account data model

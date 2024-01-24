export default {
	ClientID: { type: Number, default: 0, required: true, unique: false, minlength: 20 },
	TicketID: { type: Number, default: 0, required: true, unique: true, minlength: 14, maxlength: 20 },
	TicketTitle: { type: String, unique: false, required: true, default: "No Title Provided" },
	TicketDescription: { type: String, unique: false, required: true, default: "No Description Provided" },
	TicketStatus: { type: String, unique: false, default: "Pending", enum: ["Pending", "In Progress", "Resolved", "Rejected"] },
	CurrentClientDetails: { type: Object, unique: false, default: {} },
	RequestDate: { type: Number, default: Date.now(), unique: false },
	AdminResponse: { type: String, default: "No response yet", required: true, unique: false },
};

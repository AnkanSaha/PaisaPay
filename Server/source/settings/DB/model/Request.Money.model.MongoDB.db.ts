export default {
    RequestID: {type: Number, required: true, unique: true, minlength: 10, default: 0},
    RequesterClientID: {type: Number, required: true, unique: false, minlength: 10, default: 0},
    RequesterName: {type: String, required: true, unique: false, default: "guest"},
    RequesterPaymentID: {type: String, required: true, unique: false, default: "example@pp"},
    RequesterEmail: {type: String, required: true, unique: false, default: "example@example.com"},
    RequesterPhoneNumber: {type: Number, required: true, unique: false, default: 0, minlength: 10, maxlength: 10},
    RequesterIPaddress: {type: String, required: true, unique: false, default: "192.168.1.1"},
    TransactionID: {type: Number, required: true, unique: true, minlength: 15, default: 0},
    TransactionDate: {type: Date, required: false, unique: false, default: Date.now()},
    TransactionType: {type: String, required: false, unique: false, default: "Request Money", enum: ["Request Money"]},
    TransactionAmount: {type: Number, required: true, unique: false, default: 0, min: 0},
    TransactionStatus: {type: String, required: true, unique: false, default: "Pending", enum: ["Pending", "Completed"]},
    TransactionDescription: {type: String, required: false, unique: false, default: "No description provided."},
    TransactionMethod: {type: String, required: false, unique: false, default: "PaisaPay Wallet", enum: ["PaisaPay Wallet"]},
    TransactionCurrency: {type: String, required: false, unique: false, default: "INR", enum: ["INR"]},
    TransactionFee: {type: Number, required: true, unique: false, default: 0, min: 0},
    SenderClientID: {type: Number, required: true, unique: false, minlength: 15, default: 0},
    SenderName: {type: String, required: true, unique: false, default: "guest"},
    SenderEmail: {type: String, required: true, unique: false, default: "example@example.com"},
    SenderPhoneNumber: {type: Number, required: true, unique: false, default: 0, minlength: 10, maxlength: 10},
    SenderPaymentID: {type: String, required: true, unique: false, default: "example@pp"},
};
export default {
    UserClientID: {type: Number, required: true},
    UserPaymentID: {type : String, required: true},
    UserName: {type: String, required: true},
    UserEmail: {type: String, required: true},
    UserPhone: {type: String, required: true},
    TransactionID: {type: Number, default: '00000'},
    TransactionDate: {type: Date, required: true, default: Date.now()},
    TransactionType: {type: String, required: true, default: "Add Funds"},
    TransactionAmount: {type: Number, required: true},
    TransactionDescription: {type: String, required: true, default: "No description provided."},
    TransactionStatus: {type: String, required: true, default: "Success"},
    TransactionMethod: {type: String, required: true, default: "Unknown"},
    TransactionFee: {type: Number, required: true, default: 0},
} // export the transaction data model
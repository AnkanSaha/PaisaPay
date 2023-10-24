export default {
    UserClientID: {type: Number, required: true},
    UserPaymentID: {type : String, required: true},
    UserName: {type: String, required: true},
    UserEmail: {type: String, required: true},
    UserPhone: {type: String, required: true},
    TransactionID: {type: String, default: '00000', required: true},
    TransactionMethod: {type: String, required: true, default: "Unknown"},
    TransactionDate: {type: Date, required: true, default: Date.now()},
    TransactionAmount: {type: Number, required: true},
    TransactionStatus: {type: String, required: true, default: "Success"},
    TransactionFee: {type: Number, required: true, default: 0},
    BankName: {type: String, required: true, default: "Unknown"},
    BankAccountName: {type: String, required: true, default: "Unknown"},
    BankAccountNumber: {type: Number, required: true, default: "Unknown"},
    BankAccountType: {type: String, required: true, default: "Savings"},
    BankAccountBranch: {type: String, required: true, default: "Unknown"},
    IFSCCode: {type: String, required: true, default: "Unknown"},
}
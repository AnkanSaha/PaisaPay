export default {
    ClientID: {type: Number, required: true},
    Balance: {type: Number, required: true, default: 0},
    Last_Transaction: {type: Object, required: true, default: {}},
    Last_Transaction_Date: {type: Date, required: true, default: Date.now()},
    Last_Transaction_Type: {type: String, required: true},
    Last_Transaction_Amount: {type: Number, required: true},
    Last_Transaction_Description: {type: String, required: true, default: "No description provided."},
    Last_Transaction_ID: {type: Number, required: true},
    Last_Transaction_Status: {type: String, required: true, default: "Pending"},
    All_Previous_Transactions: {type: Array, required: true, default: []},
}
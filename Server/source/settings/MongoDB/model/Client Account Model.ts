export default {
    ClientID: {type: Number, required: true},
    Name: {type: String, required: true},
    Email: {type: String, required: true},
    PhoneNumber: {type: Number, required: true},
    Password: {type: String, required: true},
    National_ID_Type: {type: String, required: true},
    National_ID_Number: {type: String, required: true},
    ProfilePicturePath: {type: String, required: true},
    ProfilePicSize: {type: Number, required: true},
    ProfilePicFileName: {type: String, required: true},
    DateCreated: {type: Date, required: true, default: Date.now()},
    AccountStatus: {type: String, required: true, default: "Active"},
    AccountType: {type: String, required: true, default: "Client"},
    LastLogin: {type: Date, required: true, default: Date.now()},
    LastLoginIP: {type: String, required: true},
    LastLoginClientDetails: {type: Object, required: true}
} // export the client account data model
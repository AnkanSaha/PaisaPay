export default {
    RequesterClientID: {type: Number, required: true, unique: true, minlength: 10, default: 0},
    RequesterName: {type: String, required: true, unique: false, default: "guest"},
    RequesterEmail: {type: String, required: true, unique: false, default: "example@example.com"},
    RequesterPhoneNumber: {type: Number, required: true, unique: false, default: 0, minlength: 10, maxlength: 10},
}
export default {
    ClientID : {type: String, default: 'Does not exist'},
    TicketID : {type: String, required: true, unique: true},
    TicketTitle : {type: String, required: true},
    TicketDescription : {type: String, required: true},
    TicketStatus : {type: String, default: 'Pending'},
    CurrentClientDetails: {type: Object, default: {}},
    RequestDate : {type: Number, default: Date.now(), index: true},
}
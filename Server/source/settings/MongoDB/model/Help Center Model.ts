export default {
    ClientID : {type: String, default: 'Does not exist'},
    TicketID : {type: String, required: true, unique: true},
    TicketTitle : {type: String, required: true, index : true},
    TicketDescription : {type: String, required: true},
    TicketStatus : {type: String, default: 'Pending', index: true},
    CurrentClientDetails: {type: Object, default: {}},
    RequestDate : {type: Number, default: Date.now(), index: true},
    AdminResponse : {type: String, default: 'No response yet', required: true}
}
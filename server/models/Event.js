const mongoose = require("mongoose") ;
const {Schema} = mongoose ;

const EventSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("event", EventSchema);
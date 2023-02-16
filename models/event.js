const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    event_image:{
        type:String,
        required:true
    },
    event_name:{
        type:String,
        required:true
    },  
    event_price:{
        type:String,
        required:false
    },
    event_startdate:{
        type:String,
        required:true
    },
    event_enddate:{
        type:String,
        required:true
    },
    event_place:{
        type:String,
        required:true
    }
},{timestamps:true})

exports.Event = mongoose.model('event',eventSchema);
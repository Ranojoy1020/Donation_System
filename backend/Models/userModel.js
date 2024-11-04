const {Schema, default: mongoose} = require('mongoose');

const userSchema = new Schema({
    user_fname:{
        type: String,
        required : true
    },
    user_lname:{
        type: String,
        required : true
    },
    user_email :{
        type : String,
        required : true
    },
    user_passwd :{
        type : String,
        required : true
    },
    user_mobile :{
        type : String,
        required : true
    },
    user_addr :{
        type : String,
        required : false
    },
    user_city :{
        type : String,
        required : false
    },
    user_state :{
        type : String,
        required : false
    },
    user_country :{
        type : String,
        required : false
    },
    user_pincode :{
        type : String,
        required : false
    },
    profile_pic :{
        type : String,
        required : false
    },
    reset_token :{
        type : String,
        default : ''
    },
    comm_pref :{
        type : Array,
        default : []
    },
}, {timestamps : true})

module.exports = mongoose.model('users', userSchema)
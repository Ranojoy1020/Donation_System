const {Schema, default: mongoose} = require('mongoose')

const adminSchema = new Schema({
    admin_fname:{
        type: String,
        required : true,
    },
    admin_lname:{
        type: String,
        required : true,
    },
    admin_email:{
        type: String,
        required : true,
    },
    admin_passwd:{
        type: String,
        required : true
    },
    admin_mobile:{
        type: Number,
        required : true
    },
    admin_role:{
        type: String,
        required : false
    },
    admin_permission:{
        type: String,
        required : false
    },
})

module.exports = mongoose.model('admin', adminSchema)
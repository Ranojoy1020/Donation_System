const { Schema, default: mongoose } = require("mongoose");

const ngoScheme = new Schema({
  reg_id: {
    type: Number,
    required: true,
  },
  ngo_name: {
    type: String,
    required: true,
  },
  ngo_email: {
    type: String,
    required: true,
  },
  ngo_passwd: {
    type: String,
    required: true,
  },
  ngo_address: {
    type: String,
    required: true,
  },
  ngo_city: {
    type: String,
    required: true,
  },
  ngo_state: {
    type: String,
    required: true,
  },
  ngo_country: {
    type: String,
    required: true,
  },
  ngo_mobile: {
    type: Number,
    required: true,
  },
  ngo_web_url: {
    type: String,
    default: '',
    required: false,
  },
  ngo_bk_name: {
    type: String,
    default: '',
    required: false,
  },
  ngo_bk_accNo: {
    type: String,
    default: '',
    required: false,
  },
  ngo_bk_ifsc: {
    type: String,
    default: '',
    required: false,
  },
  is_verified: {
    type: Boolean,
    required: false,
    default: false,
  },
  ngo_logo: {
    type: String,
    required: false,
  },
}, {timestamps: true});

module.exports = mongoose.model('ngo', ngoScheme);
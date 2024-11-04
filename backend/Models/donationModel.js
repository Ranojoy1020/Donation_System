const { Schema, default: mongoose } = require("mongoose");

const donationScheme = new Schema({
  user_id: {
    type: String,
    required: true,
  },

  ngo_id: {
    type: String,
    required: false,
  },
  
  campaign_id: {
    type: String,
    required: false,
    default: null,
  },

  donation_type: {
    type: String,
    required: true,
  },
  
  item_img_path: {
    type: String,
    required: false,
  },
  
  collection_schedule: {
    type: String,
    required: false,
  },
  
  collection_actual_time: {
    type: String,
    required: false,
  },

  amount: {
    type: Number,
    required: false,
  },

  txn_id: {
    type: String,
    required: true,
  },
  
  donation_status: {
    type: String, // Values : Pending, Accepted/Scheduled (After any NGO Accepts), Complete (After Collection)
    required: true,
    default: 'Pending'
  },
  
  donor_msg: {
    type: String,
    required: false,
    default : null,
  },

  receipt_path: {
    type: String,
    required: false,
    default : null,
  },

}, {timestamps : true});

module.exports = mongoose.model("donation", donationScheme);

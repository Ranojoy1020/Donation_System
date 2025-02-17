const { Schema, default: mongoose } = require("mongoose");

const queryScheme = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  
  query_msg: {
    type: String,
    required: false,
    default : null,
  },
  
  query_resp: {
    type: String,
    required: false,
    default : null,
  },

  query_status: {
    type: String,
    required: false,
    default : 'open',
  },

}, {timestamps : true});

module.exports = mongoose.model("query", queryScheme);

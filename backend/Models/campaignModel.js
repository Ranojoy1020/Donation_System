const { Schema, default: mongoose } = require("mongoose");

const campaignScheme = new Schema({
  ngo_id: {
    type: String,
    require: true,
  },
  campaign_name: {
    type: String,
    require: true,
  },
  campaign_desc: {
    type: String,
    require: true,
  },
  goal_amount: {
    type: Number,
    require: true,
  },
  amount_raised: {
    type: Number,
    require: true,
  },
  start_date: {
    type: Date,
    require: true,
  },
  end_date: {
    type: Date,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("campaigns", campaignScheme);

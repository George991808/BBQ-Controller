const { Schema, model } = require("mongoose");

const historySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  // deviceId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Device",
  // },
});

const history = model("History", historySchema);

module.exports = history;

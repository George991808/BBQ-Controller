const { Schema, model } = require("mongoose");

const deviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // element 0 = target temperature history
  // element 1 = louver position history
  // element 2 down = probe history
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "History",
    },
  ],

  setPoint: {
    type: Number,
  },
  // element 0 = probe 1
  // probePV: [
  //   {
  //     type: Number,
  //   },
  // ],

  output: {
    type: Number,
    min: 0,
    max: 100,
  },

  controlMode: {
    type: String,
  },

  // PID parameters

  gain: {
    type: Number,
  },

  integral: {
    type: Number,
  },

  derivative: {
    type: Number,
  },
  // UserId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

const device = model("Device", deviceSchema);

module.exports = device;

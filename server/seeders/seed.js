const db = require("../config/connection");
const { User, Device, History } = require("../models");
const userSeeds = require("./userSeeds.json");
const deviceSeeds = require("./deviceSeeds.json");
const historySeeds = require("./historySeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Device.deleteMany({});
    await History.deleteMany({});

    // await User.create(userSeeds);
    // await Device.create(deviceSeeds);
    const dbHistory = await History.insertMany(historySeeds, {
      forceServerObjectId: true,
    });

    const device = new Device({
      name: "mydevice1",
      setPoint: 120,
      output: 37,
      controlMode: "Auto",
      history: dbHistory.map((h) => h._id),
    });

    await device.save();

    const user = new User({
      name: "Brian Kernighan",
      email: "bkernighan@bbq.dev",
      password: "password01",
      devices: [device._id],
    });

    await user.save();

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

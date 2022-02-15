import mongoose from "mongoose";
import fakeDB from "./FakeDB.js";
import config from "../config/keys.cjs";

const MONGODB_URL = config.MONGODB_URL;

mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  },
  async (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("> Starting populating DB...");
      await fakeDB.populate();
      await mongoose.connection.close();
      console.log("> DB has been populated...");
    }
  }
);

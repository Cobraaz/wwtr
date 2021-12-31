import userModel from "../models/users.js";
import Users from "./FakseData.js";
class FakeDB {
  async clean() {
    await userModel.deleteMany({});
  }

  async addData() {
    await userModel.create(Users);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

export default new FakeDB();

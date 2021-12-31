// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// let key = {};

// if (process.env.NODE_ENV === "production") {
//   key = require("./prod.js");
//   export default key;
// } else {
//   key = require("./dev.cjs");
//   export default key;
// }

// // key = require("./dev.cjs");
// // export default key;

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod.cjs");
} else {
  module.exports = require("./dev.cjs");
}

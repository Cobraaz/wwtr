import express from "express";

import connectDB from "./config/db.js";
import usersRoutes from "./routes/users.js";
import ParametersRoutes from "./routes/paramWeightages.js";
import fs from "fs";
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Define Routes
app.use("/api/users", usersRoutes);
app.use("/api/parameters", ParametersRoutes);

// Set static folder
if (process.env.NODE_ENV === "production") {
  try {
    app.use(express.static(process.cwd() + "/client/build"));

    app.get("*", (req, res) => {
      res.sendFile(process.cwd() + "/client/build/index.html");
    });
  } catch (error) {
    console.error(error, error.message);
  }
} else {
  if (fs.existsSync(process.cwd() + "/client/build/index.html")) {
    app.use(express.static(process.cwd() + "/client/build"));

    app.get("*", (req, res) => {
      res.sendFile(process.cwd() + "/client/build/index.html");
    });
  } else {
    app.get("/", (req, res) =>
      res.send("Please create a build folder of client")
    );
  }
}

const PORT = parseInt(process.env.PORT, 10) || 5000;

app.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server running on PORT: ${PORT}`);
});

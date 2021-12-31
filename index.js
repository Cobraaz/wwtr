import express from "express";

import connectDB from "./config/db.js";
import usersRoutes from "./routes/users.js";
import ParametersRoutes from "./routes/paramWeightages.js";
const app = express();

// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(express.static(process.cwd() + "/client/"));
// Define Routes
app.use("/api/users", usersRoutes);
app.use("/api/parameters", ParametersRoutes);

// app.get("/", (req, res) => {

//   res.sendFile(process.cwd() + "/client/build/index.html");
// });

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(process.cwd() + "/client/build"));

  app.get("*", (req, res) =>
    res.sendFile(process.cwd() + "/client/build/index.html")
  );
}

const PORT = parseInt(process.env.PORT, 10) || 5000;

app.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server runningss on PORT: ${PORT}`);
});

// cer console.error

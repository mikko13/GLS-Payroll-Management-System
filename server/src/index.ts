import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import employeeRoutes from "./routes/employeeRoutes";
import payrollRoutes from "./routes/payrollRoutes";

const envPath = path.resolve(__dirname, "..", ".env");

dotenv.config({ path: envPath });

const app = express();

const PORT = process.env.PORT;

if (!PORT) {
  console.error("Error: PORT is not defined in .env file");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env file");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api/employees", employeeRoutes);
app.use("/api/payrolls", payrollRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

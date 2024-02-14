import express from "express";
import chalk from "chalk";
import { config } from "dotenv";
import morgan from "morgan";
import employeeRoutes from "./routes/employeeRoutes.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/v1", employeeRoutes);

app.listen(PORT, () => {
	console.log(chalk.magentaBright.underline(`Server running on http://localhost:${PORT}`));
});

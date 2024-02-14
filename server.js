const express = require("express");
const { config } = require("dotenv");
const morgan = require("morgan");
const employeeRoutes = require("./routes/employeeRoutes");

config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

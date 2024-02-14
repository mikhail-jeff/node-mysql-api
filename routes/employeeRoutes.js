const express = require("express");
const Employee = require("../models").employee;

const router = express.Router();

// *** ADD employee enpoint
router.post("/", async (request, response) => {
	const { name, email, gender, mobile } = request.body;

	if (!name || !email) {
		return response.status(400).json({
			message: "Name and Email field is required",
		});
	}

	const exists = await Employee.findOne({
		where: { email },
	});

	if (exists) {
		return response.status(400).json({
			message: "Email already exists",
		});
	}

	try {
		const employee = await Employee.create({
			name,
			email,
			gender,
			mobile,
		});

		response.status(201).json({
			message: "Employee created successfully",
			employee,
		});
	} catch (error) {
		response.status(400).json({
			message: "Failed to execute query",
		});
	}
});

// *** GET ALL employee endpoint
router.get("/", async (request, response) => {
	try {
		const employees = await Employee.findAll();

		response.status(200).json({
			message: "Employees found",
			employees,
		});
	} catch (error) {
		response.status(404).json({
			message: "Failed to execute query",
		});
	}
});

module.exports = router;

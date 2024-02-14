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
		return response.status(409).json({
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
		response.status(500).json({
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
		response.status(500).json({
			message: "Failed to execute query",
		});
	}
});

// *** GET SINGLE employee endpoint
router.get("/:id", async (request, response) => {
	const { id } = request.params;

	try {
		// Check if the employee exists
		const employeeExists = await Employee.findOne({
			where: { id },
		});

		if (!employeeExists) {
			return response.status(404).json({
				message: "Employee not found",
			});
		}

		// Employee exists, proceed to retrieve their information
		const employee = await Employee.findOne({
			where: { id },
		});

		response.status(200).json({
			message: "Employee found",
			employee,
		});
	} catch (error) {
		response.status(500).json({
			message: "Failed to execute query",
		});
	}
});

// *** UPDATE employee endpoint
router.put("/:id", async (request, response) => {
	const { id } = request.params;
	const { name, email, gender, mobile } = request.body;

	try {
		// Check if the employee exists
		const employeeExists = await Employee.findOne({
			where: { id },
		});

		if (!employeeExists) {
			return response.status(404).json({
				message: "Employee not found",
			});
		}

		const updatedEmployee = await Employee.update(
			{
				name,
				email,
				gender,
				mobile,
			},
			{ where: { id } }
		);

		// Check the number of rows affected to confirm if the update was successful
		if (updatedEmployee[0] === 1) {
			const updatedEmployeeData = await Employee.findOne({
				where: { id },
			});

			return response.status(200).json({
				message: "Employee updated successfully",
				employee: updatedEmployeeData,
			});
		} else {
			return response.status(500).json({
				message: "Failed to update employee",
			});
		}
	} catch (error) {
		console.log(error);
		response.status(500).json({
			message: "Failed to execute query",
		});
	}
});

module.exports = router;

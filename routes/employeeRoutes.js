const express = require("express");

const router = express.Router();

// welcome route
router.get("/", (request, response) => {
	response.status(200).json({ message: "Welcome to Express Server" });
});

module.exports = router;

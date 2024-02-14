import { Router } from "express";

const router = Router();

// welcome route
router.get("/", (request, response) => {
	response.status(200).json({ message: "Welcome to Express Server" });
});

export default router;

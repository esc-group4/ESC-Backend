import { create as createTrainingRequest } from "../models/trainingRequest.js";
import express from "express";
var router = express.Router();

// basically conduct the following after doing the verifyToken method
router.post("/", async (req, res) => {
    const missing = [];
    const body = ["type", "reasons", "startDate", "endDate", "trainerEmail", "department_name", "course_name", "staff_ids"];
    body.forEach(name => {
        if (!req.body[name]) missing.push(name);
    });
    if (missing.length > 0) return res.status(400).send("Missing data [" + missing.join(", ") + "]");
    try {
        let { type, reasons, startDate, endDate, trainerEmail, department_name, course_name, staff_ids } = req.body;
        startDate = new Date(startDate).toISOString().split('T')[0];
        endDate = new Date(endDate).toISOString().split('T')[0];
        await createTrainingRequest(type, reasons, startDate, endDate, trainerEmail, department_name, course_name);
        console.log(staff_ids);


        res.status(201).send("Successful create Training Request");
    } catch (error) {
        console.error("Error creating training request:", error);
        res.status(500).json({ message: "Internal Error" });
    }
});

export { router };
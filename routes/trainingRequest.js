import { create as createTrainingRequest, updateStatus } from "../models/trainingRequest.js";
import { createMany as createManyTraining } from "../models/training.js";
import express from "express";
var router = express.Router();

// basically conduct the following after doing the verifyToken method
router.post("/", async (req, res) => {
    const body = ["type", "reasons", "startDate", "endDate", "trainerEmail", "department_name", "course_name", "staff_ids"];
    const missing = body.filter(name => !req.body[name]);
    if (missing.length > 0) return res.status(400).send("Missing data [" + missing.join(", ") + "]");
    try {
        let { type, reasons, startDate, endDate, trainerEmail, department_name, course_name, staff_ids } = req.body;
        startDate = new Date(startDate).toISOString().split('T')[0];
        endDate = new Date(endDate).toISOString().split('T')[0];
        const request_id = await createTrainingRequest(type, reasons, startDate, endDate, trainerEmail, department_name, course_name);
        staff_ids = JSON.parse(staff_ids);
        const affectedRows = await createManyTraining(request_id, staff_ids)
        res.status(201).json({ message: "Successful Create Training Request", training: affectedRows });
    } catch (error) {
        console.error("Error creating training request:", error);
        res.status(500).json({ message: "Internal Error" });
    }
});

router.put("/status/:request_id", async (req, res) => {
    try {
        const affectedrow = await updateStatus(req.params.request_id);
        if (affectedrow == 0) res.status(400).send("Invalid request_id");
        res.status(201).send("Successful update training request status");
    } catch (err) {
        console.error("Error updating request_id: ", err);
        res.status(500).send("Error retrieving staff");
    }
});

export { router };
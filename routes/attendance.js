import { updateAttendance } from "../models/training.js";
import express from "express";
const router = express.Router();

router.put("/:request_id/:staff_id", async (req, res) => {
  const { request_id, staff_id } = req.params;
  if (request_id == null || staff_id == null)
    return res.status(404).send("Empty request_id or staff_id");
  try {
    const result = await updateAttendance(request_id, staff_id);
    if (result == 1) res.status(201).send("Attendance Updated");
    else res.status(400).send("Invalid request_id or staff_id");
  } catch (err) {
    console.error("Error retrieving department: ", err);
    res.status(500).send("Error retrieving department");
  }
});

export { router };

import express from "express";
import { getNameById } from "../models/designation.js";

const router = express.Router();

/**
 * Get the designation name by ID
 * @route GET /designation/:id
 * @param {number} designationId - The ID of the designation
 * @returns {Object} - { position: string }
 */
router.get("/:id", async (req, res) => {
  const designationId = parseInt(req.params.id, 10);

  if (isNaN(designationId)) {
    return res.status(400).send({ error: "Invalid designation ID" });
  }

  try {
    const name = await getNameById(designationId);
    if (name === null) {
      return res.status(404).send({ error: "Designation not found" });
    }
    res.status(200).send({ position: name });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

export { router };

import { verifyToken } from "../middleware/verifyToken.js";
import { getByFirebaseUid } from "../models/staff.js";
import express from "express";
var router = express.Router();

// basically conduct the following after doing the verifyToken method
router.get("/verify", verifyToken, async (req, res) => {
  try {
    res.json(await getByFirebaseUid(req.user.uid));
  } catch (error) {
    console.error("Error verifying staff:", error);
    res.status(500).json({ message: "Internal Error" });
  }
});

export { router };

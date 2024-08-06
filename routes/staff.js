import express from "express";
import {
  all,
  findById,
  findByCredentials,
  getByFirebaseUid,
} from "../models/staff.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    res.json(await all());
  } catch (err) {
    console.error("Error retrieving staff: ", err);
    res.status(500).send("Error retrieving staff");
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.json(await findById(req.params.id));
  } catch (err) {
    console.error("Error retrieving staff: ", err);
    res.status(500).send("Error retrieving staff");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByCredentials(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.error("Error logging in: ", err);
    res.status(500).send("Error logging in");
  }
});

export { router };

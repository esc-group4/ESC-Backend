import { verifyToken } from '../middleware/verifyToken.js';
import { getByFirebaseUid } from '../models/staff.js'
import express from 'express'
var router = express.Router();

// basically conduct the following after doing the verifyToken method
tokenRoute.post('/verifyToken', verifyToken, async (req, res) => {
  const uid = req.user.uid;
  console.log(uid)
  try {
    const staff = await getByFirebaseUid(uid)
    console.log(`Received UID: ${uid}`);
    res.json(staff);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: "Internal Error" });
  }
});

export { router };
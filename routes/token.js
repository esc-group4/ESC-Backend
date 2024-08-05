import { verifyToken } from '../middleware/verifyToken.js';
import { getByFirebaseUid } from '../models/staff.js'
import express from 'express'
var router = express.Router();

// basically conduct the following after doing the verifyToken method
router.get('/verify', verifyToken, async (req, res) => {
    const uid = req.user.uid;
    console.log(uid)
    try {
        console.log(`Received UID: ${uid}`);
        const staff = await getByFirebaseUid(uid)
        console.log(staff);
        res.json(staff);
    } catch (error) {
        console.error('Error verifying staff:', error);
        res.status(500).json({ message: "Internal Error" });
    }
});

export { router };
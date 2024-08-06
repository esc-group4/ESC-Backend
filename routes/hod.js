import { getTrainingRequest } from '../models/trainingRequest.js';
import express from 'express';
const router = express.Router();

router.get("/trainingrequest/:department_name", async (req, res) => {
    try {
        res.json(await getTrainingRequest(req.params.department_name));
    } catch (err) {
        console.error('Error retrieving department: ', err);
        res.status(500).send('Error retrieving department');
    }
});

export { router };
import { getTrainingRequestAll } from '../models/trainingRequest.js';
import express from 'express';
const router = express.Router();

router.get("/trainingrequest/all", async (req, res) => {
    try {
        res.json(await getTrainingRequestAll(req.params.department_name));
    } catch (err) {
        console.error('Error retrieving hr training request: ', err);
        res.status(500).send('Error retrieving hr training request');
    }
});

export { router };
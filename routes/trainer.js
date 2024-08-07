import { getProcessedTrainerInfo } from '../models/trainingRequest.js';
import express from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.json(await getProcessedTrainerInfo());
    } catch (err) {
        console.error('Error retrieving training request: ', err);
        res.status(500).send('Error retrieving training request');
    }
});

export { router };
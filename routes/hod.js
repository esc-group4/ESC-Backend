import { getTrainingRequest, getTrainingRequestDetails } from '../models/trainingRequest.js';
import { getStaffsByRequestId } from '../models/training.js';
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

router.get("/trainingrequest/detail/:request_id", async (req, res) => {
    const { request_id } = req.params;
    try {
        res.json({
            trainingRequest: await getTrainingRequestDetails(request_id),
            staff: await getStaffsByRequestId(request_id)
        });
    } catch (err) {
        console.error('Error retrieving training request detail: ', err);
        res.status(500).send('Error retrieving training request detail');
    }
});

export { router };
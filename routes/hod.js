import { getTrainingRequest,getTrainingRequestDetails } from '../models/trainingRequest.js';
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


router.get("/trainingrequest/:request_id", async (req, res) => {
    try {
        trainingReqDetails = await getTrainingRequestDetails(req.params.request_id)
        stafflst = await getStaffId(req.params.request_id);
        staffDetails = await getStaffbyList(stafflst);
        const combinedDetails = {
            trainingRequest: trainingReqDetails,
            staff: staffDetails
        };
        res.json(combinedDetails);
    } catch (err) {
        console.error('Error retrieving department: ', err);
        res.status(500).send('Error retrieving department');
    }
});

export { router };
import { getNotification } from '../models/notification.js';
import express from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const notifications = await getNotification();
        console.log(notifications);
        res.json(notifications);
    } catch (err) {
        console.error('Error retrieving department: ', err);
        res.status(500).send('Error retrieving department');
    }
});

export { router };
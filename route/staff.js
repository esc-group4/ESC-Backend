import express from 'express';
import { getAllStaff } from '../models/staff.js';

const router = express.Router();

// AJAX end points
router.get('/all/', async function (req, res, next) {
    try {
        const staffs = await getAllStaff();
        res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.json(staffs);
    } catch (error) {
        next(error);
    }
});

export default router;
import { all, findById } from '../models/staff.js';
import express from 'express';
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        res.json(await all());
    } catch (err) {
        console.error('Error retrieving staff: ', err);
        res.status(500).send('Error retrieving staff');
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await await findById(req.params.id));
    } catch (err) {
        console.error('Error retrieving staff: ', err);
        res.status(500).send('Error retrieving staff');
    }
});

export { router };
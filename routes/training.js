import express from 'express';
import { getAllTraining, getAllExternalTraining, getAllInternalTraining } from '../models/training.js';

const router = express.Router();

// get all trainings
router.get('/', async (req, res) => {
  try {
    const { external, internal } = req.query;
    let trainings = [];

    if (external === 'true' && internal === 'true') {
      trainings = await getAllTraining();
    } else if (external === 'true') {
      trainings = await getAllExternalTraining();
    } else if (internal === 'true') {
      trainings = await getAllInternalTraining();
    } else {
      return res.json(trainings); // empty array if no boxes are ticked
    }

    res.json(trainings);
  } catch (err) {
    console.error('Error retrieving trainings: ', err);
    res.status(500).send('Error retrieving trainings');
  }
});


export default router;

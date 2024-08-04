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
  
// // Route to insert a new staff member
// app.post('/staff', async (req, res) => {
//     try {
//       const newStaff = req.body;
//       const insertedStaff = await insertStaff(newStaff);
//       res.status(201).json(insertedStaff);
//     } catch (err) {
//       console.error('Error inserting staff: ', err);
//       res.status(500).send('Error inserting staff');
//     }
//   });
  
// app.get("/", (req, res) => {
//     res.send("working fine");
//   });
//   const dummyUserData = {
//     id: 1,
//     firebase_uid: "abc123",
//     name: "Javier Tan",
//     email: "javiertan@tsh.com",
//     role: "Engineering Manager",
//     department: "employee",
  
//   };

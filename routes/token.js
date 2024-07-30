import { verifyToken } from './middleware/verifyToken.js';
import express from 'express';

const dummyUserData = {
  id: 1,
  firebase_uid: "abc123",
  name: "Javier Tan",
  email: "javiertan@tsh.com",
  role: "Engineering Manager",
  department: "employee",

};

app.post('/verifyToken', verifyToken, async (req, res) => {
    const uid = req.user.uid;
  
    try {
  
      /* const [rows] = await db.execute('SELECT * FROM users WHERE firebase_uid = ?', [uid]);
      
      if (rows.length === 0) {
        return res.status(404).send('User not found');
      }
  
      const user = rows[0];
      res.json(user); */
      console.log(`Received UID: ${uid}`);
      res.json(dummyUserData1);
    } catch (error) {
      console.error('Error querying the database:', error);
      res.status(500).json({ message: "Internal Error" });
    }
  });
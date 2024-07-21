const dummyUserData1 = {
    id: 1,
    firebase_uid: "asdasdads",
    name: "Jim",
    email: "jim@example.com",
    role: "CNC Machine Operator"
  };
  
  const dummyUserData2 = {
    id: 2,
    firebase_uid: "abc123",
    name: "Michael",
    email: "michael@Mayer.com",
    role: "HOD Machining"
  };
  
  const dummyUserData3 = {
    id: 1,
    firebase_uid: "abc123",
    name: "Toby",
    email: "toby@example.com",
    role: "HR Admin"
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
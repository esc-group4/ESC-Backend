import { getAllStaff, getStaff, insertStaff} from './models/staff.js';

// Route to get all staff
app.get('/staff', async (req, res) => {
    try {
      const staffs = await getAllStaff();
      res.json(staffs);
    } catch (err) {
      console.error('Error retrieving staff: ', err);
      res.status(500).send('Error retrieving staff');
    }
  });
  
app.get('/staff/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const staff = await getStaff(id);
        res.send(staff);
      } catch (err) {
        console.error('Error retrieving staff id: ', err);
        res.status(500).send('Error retrieving staff id');
      }
  });
  
// Route to insert a new staff member
app.post('/staff', async (req, res) => {
    try {
      const newStaff = req.body;
      const insertedStaff = await insertStaff(newStaff);
      res.status(201).json(insertedStaff);
    } catch (err) {
      console.error('Error inserting staff: ', err);
      res.status(500).send('Error inserting staff');
    }
  });
  
app.get("/", (req, res) => {
    res.send("working fine");
  });
  const dummyUserData = {
    id: 1,
    firebase_uid: "abc123",
    name: "Javier Tan",
    email: "javiertan@tsh.com",
    role: "Engineering Manager",
    department: "employee",
  
  };
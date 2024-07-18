// Example usage
import { connectToDatabase, cleanup } from './models/db.js'; // Adjust path as necessary
import { sync, getAllStaff, getStaff, insertStaff } from './models/staff.js';
import './route/staff.js';


export async function exampleUsage() {
  try {
    await connectToDatabase();
    
    // // Fetch all staff
    // const allStaff = await getAllStaff();
    // console.log('All staff:', allStaff);

    // Fetch a staff by id
    // const staff = await getStaff(101);
    // console.log('Staff:', staff);

    const newStaff = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      designation_id: 1,
      training_id: 101,
    };
    
    insertStaff(newStaff)
      .then(insertedStaff => {
        console.log('Inserted staff:', insertedStaff);
        // Further processing or response handling
      })
      .catch(err => {
        console.error('Error inserting staff:', err);
        // Error handling
      });


    await cleanup();
  } catch (err) {
    console.error('Error in example usage: ', err);
  }
}
exampleUsage();
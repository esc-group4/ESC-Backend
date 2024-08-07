import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cleanup } from "./models/db.js";
import { sync } from "./models/dbSync.js";
import { router as departmentRouter } from "./routes/department.js";
import { router as staffRouter } from "./routes/staff.js";
import { router as courseRouter } from "./routes/course.js";
import { router as tokenRouter } from "./routes/token.js";
import { router as attendanceRouter } from "./routes/attendance.js";
import { router as notificationRouter } from "./routes/notification.js";
import { router as hodRouter } from "./routes/hod.js";
import { router as trainingRequestRouter } from "./routes/trainingRequest.js";
import { router as designationRouter } from "./routes/designation.js";

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

await sync();

app.use("/department", departmentRouter);
app.use("/staff", staffRouter);
app.use("/course", courseRouter);
app.use("/token", tokenRouter);
app.use("/attendance", attendanceRouter);
app.use("/notification", notificationRouter);
app.use("/hod", hodRouter);
app.use("/trainingrequest", trainingRequestRouter);
app.use("/designation", designationRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (_) => console.log(`Server is running on port ${PORT}`));

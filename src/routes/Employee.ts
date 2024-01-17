import express from 'express'
import { getEmployeeTimings, getOtherEmployeeStatus, updateEmployeePassword, updateEmployeeTodayTimings } from '../controllers/Employee';

const router = express.Router();

// /employee is in base route
router.get("/self-report", getEmployeeTimings)
      .get("/status-list", getOtherEmployeeStatus)
      .patch("/timings", updateEmployeeTodayTimings)
      .patch("/reset-password", updateEmployeePassword)

export default router
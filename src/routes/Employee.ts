import express from 'express'
import { getEmployeeDetails, updateEmployeePassword, updateEmployeeTodayTimings } from '../controllers/Employee';

const router = express.Router();

// /employee is in base route
router.get("/own", getEmployeeDetails)
      .patch("/timings", updateEmployeeTodayTimings)
      .patch("/reset-password", updateEmployeePassword)

export default router
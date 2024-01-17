import express from "express";
import { createEmployee, getAllEmployees, updateEmployeeStatus } from "../controllers/Admin";

const router = express.Router();

// /admin is in base route
router.get("/employees", getAllEmployees)
      .post("/employee", createEmployee)
      .patch("/updateStatus/:empId", updateEmployeeStatus);

export default router;

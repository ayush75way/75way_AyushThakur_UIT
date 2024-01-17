import { Request, Response } from "express";
import Employee from "../modals/Employee";
import { sendPasswordSetMail } from "../utils/mailer";

// creating a new employee
const createEmployee = async (req: Request, res: Response) => {
  const {
    first_name, last_name, email, password, joining_date, birth_date, salary,
  } = req.body;
  const role = "employee";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ email: "Invalid email format" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ password: "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter" });
  }

  Employee.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Employee Email already registered" });
    } else {
      const newEmployee = new Employee({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        joining_date: joining_date,
        birth_date: birth_date,
        yearlySalary: salary,
        todayStatus: "Absent",
        todayTimings: {
          inTime: null,
          outTime: null,
        },
        role: role,
      });
      newEmployee.save();
      sendPasswordSetMail(newEmployee);
      return res.status(200).json({ msg: "Success", data: newEmployee });
    }
  });
};

// get list of all employees
const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({
      msg: "Succces",
      data: employees,
    });
  } catch (err) {
    return res.status(400).json({
      msg: "Error in getting employees",
    });
  }
  
};

// update the present status of employee for current day
const updateEmployeeStatus = async (req: Request, res: Response) => {
  const { empId } = req.params;
  try {
    const { todayStatus, inTime, outTime } = req.body;
    const todayTimings = { inTime, outTime };
    const user = await Employee.findByIdAndUpdate(
      empId,
      { $set: { todayStatus: todayStatus, todayTimings: todayTimings } },
      { new: true }
    );
    res.status(201).json({ msg: "Success", data: user });
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: "Something went wrong" });
  }
};

export { createEmployee, getAllEmployees, updateEmployeeStatus };

import { Request, Response } from "express";
import Employee from "../modals/Employee";
import { isPasswordValid } from "../utils/helpers";


// get employee today timing
const getEmployeeTimings = async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    try {
      const employee = await Employee.findOne({ _id: userId });
      return res.status(200).json({
        message: "Success",
        data: employee?.todayTimings
      })
    } catch (err) {
      console.log("Error in employee login", err);
      return res.status(404).json({ message: "Login failed" });
    }
};

// update in and out timing by employee
const updateEmployeeTodayTimings = async (req: Request, res: Response) => {
  const {inTime, outTime} = req.body;
  const user = res.locals.user;
  const todayTimings = {inTime, outTime}
  try {
    const updatedUser = await Employee.findByIdAndUpdate(
      user.id,
      { $set: { todayTimings: todayTimings } },
      { new: true }
    );
    return res.status(201).json({
      message: "Timings updated successfully",
      data: updatedUser
    })
  } catch (err) {
    console.log("Error in employee update", err);
    return res.status(404).json({ message: "Updatuib failed" });
  }
};

// used by the employee to change password from email link
const updateEmployeePassword = async (req: Request, res: Response) => {
  const {password, confirmpassword} = req.body;
  if (!isPasswordValid(password)) {
    return res.status(400).json({ password: "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter" });
  }
  if (!isPasswordValid(confirmpassword)) {
    return res.status(400).json({ password: "Confirm Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter" });
  }
  const user = res.locals.user;
  if(password == confirmpassword){
    try {
      const updatedUser = await Employee.findByIdAndUpdate(
        user.id,
        { $set: { password: password } },
        { new: true }
      );
      return res.status(201).json({
        message: "Password updated successfully",
        data: updatedUser
      })
    } catch (err) {
      console.log("Error in employee update", err);
      return res.status(404).json({ message: "Updatuib failed" });
    }
  }else{
    return res.status(404).json({
      "msg": "Please provide same passwords"
    })
  }
};

// get status of other employees
const getOtherEmployeeStatus = async (req: Request, res: Response) =>{
  try {
    const employees = await Employee.find();
    const employeesStatuses = employees.map((obj)=>{
      return {
        first_name: obj.first_name,
        last_name: obj.last_name,
        todayStatus: obj.todayStatus
      }
    })
    return res.status(200).json({
      msg: "Succces",
      data: employeesStatuses,
    });
  } catch (err) {
    return res.status(400).json({
      msg: "Error in getting employees",
    });
  }
}


export {getEmployeeTimings,updateEmployeePassword,getOtherEmployeeStatus, updateEmployeeTodayTimings}
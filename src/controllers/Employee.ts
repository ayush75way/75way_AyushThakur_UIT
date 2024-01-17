import { Request, Response } from "express";
import Employee from "../modals/Employee";
import * as jwt from "jsonwebtoken"; 
const JWT_SECRET_KEY="JWT_SECRET_KEY"

// get employees own details
const getEmployeeDetails = async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    try {
      const employee = await Employee.findOne({ _id: userId });
      return res.status(200).json({
        message: "Success",
        data: employee
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
  console.log(user)
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


export {getEmployeeDetails,updateEmployeePassword, updateEmployeeTodayTimings}
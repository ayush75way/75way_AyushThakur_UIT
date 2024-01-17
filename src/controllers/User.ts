import { Request, Response } from "express";
import User from "../modals/User";
import * as jwt from "jsonwebtoken";
import Employee from "../modals/Employee";

// admin will be created from this endpoint
const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  const role = "admin";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ email: "Invalid email format" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ password: "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter" });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already registered" });
    } else {
      const newUser = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        role: role,
      });
      newUser.save();
      return res.status(200).json({ msg: newUser });
    }
  });
};


// both admin & employee can login from this endpoint
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const employee = await Employee.findOne({ email: email });
    const JWT_SECRET_KEY = "JWT_SECRET_KEY";

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ password: "Invalid password format" });
    }

    if (user) {
      if (user?.password == password) {
        const accessToken = jwt.sign(
          {
            id: user?._id,
            role: user?.role,
          },
          JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          access: accessToken,
        });
      }
    } else if (employee) {
      if (employee?.password == password) {
        const accessToken = jwt.sign(
          {
            id: employee?._id,
            role: employee?.role,
          }, JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          access: accessToken,
        });
      }
    } else {
      return res.status(400).json({
        "msg": "User not found"
      });
    }
  } catch (err) {
    console.log("Error in user login", err);
    return res.status(404).json({ message: "Login failed" });
  }
};


export { createUser, loginUser };

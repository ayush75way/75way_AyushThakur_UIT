import { Request, Response } from "express";
import User from "../modals/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import Employee from "../modals/Employee";
import { isEmailValid, isPasswordValid } from "../utils/helpers";

const sanitizeUser = (user: any) => {
  const { first_name, last_name, email, role } = user;
  return {
    first_name,
    last_name,
    email,
    role,
  };
};

// admin will be created from this endpoint
const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  const role = "admin";

  if (!isEmailValid(email)) {
    return res.status(400).json({ email: "Invalid email format" });
  }
  if (!isPasswordValid(password)) {
    return res.status(400).json({
      password:
        "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter",
    });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already registered" });
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);

      const newUser = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
        role: role,
      });
      newUser.save();
      console.log(newUser);
      return res.status(200).json({ msg: sanitizeUser(newUser) });
    }
  });
};

// both admin & employee can login from this endpoint
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: any = await User.findOne({ email: email });
    const employee = await Employee.findOne({ email: email });
    const JWT_SECRET_KEY = "JWT_SECRET_KEY";

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        password:
          "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter",
      });
    }
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessToken = jwt.sign(
          {
            id: user?._id,
            role: user?.role,
          },
          JWT_SECRET_KEY,
          { expiresIn: "5m" }
        );
        const refreshToken = jwt.sign(
          { id: user?._id, role: user?.role },
          JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          access: accessToken,
          refresh: refreshToken
        });
      } else {
        return res.json({
          msg: "Wrong password",
        });
      }
    } else if (employee) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessToken = jwt.sign(
          {
            id: employee?._id,
            role: employee?.role,
          },
          JWT_SECRET_KEY,
          { expiresIn: "5m" }
        );
        const refreshToken = jwt.sign(
          { id: user?._id, role: user?.role },
          JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          access: accessToken,
          refresh: refreshToken
        });
      } else {
        return res.json({
          msg: "Wrong password",
        });
      }
    } else {
      return res.status(400).json({
        msg: "User not found",
      });
    }
  } catch (err) {
    console.log("Error in user login", err);
    return res.status(404).json({ message: "Login failed" });
  }
};

const refreshToken =async (req: Request, res: Response) =>{
  const {refresh} = req.body;
  

}

export { createUser, loginUser };

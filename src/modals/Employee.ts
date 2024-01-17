import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joining_date: { type: Date, required: true },
  birth_date: { type: Date, required: true },
  yearlySalary: { type: Number, required: true },
  todayStatus: {
    type: String,
    enum: [
      "Present",
      "Absent",
      "On Leave",
      "Before Half Day",
      "After Half Day",
    ],
    default: "Absent",
  },
  todayTimings: {
    inTime: { type: String },
    outTime: { type: String },
  },
  role: String,
});
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

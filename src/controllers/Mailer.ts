import moment from "moment";
import Employee from "../modals/Employee";
import { sendAnniversaryEmail, sendBirthdayEmail } from "../utils/mailer";

interface UserObj{
    name:String,
    email: String,
    birth_date: Date
}


export const wishEmployeesBirthday = async () => {
    try {
        const today = moment().format("YYYY-MM-DD")
        const month = moment().month()
        const day = moment().date()
       
        const employees = await Employee.find();
        const filteredEmps = employees.filter(obj => {
            const birthMonth = moment(obj.birth_date).month()
            const monthDay = moment(obj.birth_date).date()
            return month == birthMonth && day == monthDay
        })
        const birthDays = filteredEmps.map((emp) => {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                birth_date: emp.birth_date,
                email: emp.email,
            };
        });
        birthDays.forEach(user=>{
            sendBirthdayEmail(user)
        })
    } catch (err) {
        console.log(err);
        throw err; 
    }
};

export const wishWorkAnniversary = async () => {
    try {
        const today = moment().format("YYYY-MM-DD")
        const month = moment().month()
        const day = moment().date()
       
        const employees = await Employee.find();
        const filteredEmps = employees.filter(obj => {
            const anniversaryMonth = moment(obj.joining_date).month()
            const monthDay = moment(obj.joining_date).date()
            return month == anniversaryMonth && day == monthDay
        })
        const anniversaries = filteredEmps.map((emp) => {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                joining_date: emp.joining_date,
                email: emp.email,
            };
        });
        anniversaries.forEach(user=>{
            sendAnniversaryEmail(user)
        })
    } catch (err) {
        console.log(err);
        throw err; 
    }
};
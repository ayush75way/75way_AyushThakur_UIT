import * as nodemailer from 'nodemailer';
const MY_EMAIL = 'devpractice27@gmail.com';
const MY_PASSWORD = 'ndiflkouvjwbjfky';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: MY_EMAIL,
    pass: MY_PASSWORD
  }
});

const resetPasswordLink = 'http://localhost:8000/reset-password'
const changePasswordTemplate = `
  Password change link
  Follow this link to create new password for your account:
    ${resetPasswordLink}

  Thanks
`;

export const sendPasswordSetMail = async(newEmployee:any) =>{
  const mailOptions = {
    from: MY_EMAIL,
    to: newEmployee.email,
    subject: 'Password Change Link',
    text: changePasswordTemplate,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export const sendBirthdayEmail = async (user:any) => {
  const mailOptions = {
    from: MY_EMAIL,
    to: user.email,
    subject: 'Happy Birthday!',
    text: `Dear ${user.name},\n\nHappy Birthday! 🎉🎂\n\nBest wishes,\n`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export const sendAnniversaryEmail = async (user:any) => {
  const mailOptions = {
    from: MY_EMAIL,
    to: user.email,
    subject: 'Happy Work Anniversary!',
    text: `Dear ${user.name},\n\nHappy Work Anniversary! 🎉 🎉 🎉 \n\nBest wishes,\n`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


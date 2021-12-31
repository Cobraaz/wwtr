import config from "../config/keys.cjs";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

const SENDGRID_API_KEY = config.SENDGRID_API_KEY;

const sendEmail = (to, name) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: SENDGRID_API_KEY,
      },
    })
  );

  var mailOptions = {
    from: "noreplyWWTR@ramboll.com",
    to: to,
    subject: "WWTR",
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Waste Water Treatment.</h2>
    <p>Dear Sir,
    <br/>
    Thank you Mr.${name} for your precious time for the review , 
    in coming days we will try our level best to give more satisfaction to the customer, 
    <br/>
    Regards,
    <br/>
    Ramboll
    </p>
    </div>
        `,
  };

  transporter.sendMail(mailOptions);
};

export default sendEmail;

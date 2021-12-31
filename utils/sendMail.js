import config from "../config/keys.cjs";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

const SENDGRID_API_KEY = config.SENDGRID_API_KEY;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API_KEY,
    },
  })
);

const sendEmail = async (to, url, txt) => {
  var mailOptions = {
    from: "noreplyWWTR@ramboll.com",
    to: to,
    subject: "WWTR",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Waste water treatment.</h2>
            <p>Congratulations! You're almost set to start using Waste✮Water✮Treatment.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  transporter.sendMail(mailOptions);
};

export default sendEmail;

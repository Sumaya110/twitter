import nodemailer from "nodemailer";

export const sendMail = async (email, uniqueString) => {
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    };
    var Transport = nodemailer.createTransport(smtpConfig);


    var mailOptions;
    let sender = "sumaya Jahan";
    mailOptions = {
        form: sender,
        to: email,
        subject: "Email confirmation",
        html: `Press <a href=http://localhost:3000/api/users/${uniqueString}> here </a> to verify your email. Thanks`
    };
    Transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else {
            console.log("Message sent ");
        }
    });
}
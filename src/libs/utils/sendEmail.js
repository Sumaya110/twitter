import nodemailer from "nodemailer";

export const sendMail = async (email, verify_token) => {
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
        html: `Press <a href=http://localhost:3000/api/users/verify/${verify_token}> here </a> to verify your email. Thanks`

        // html: `Press <a href=http://localhost:3000/api/users/verify/${uniqueString}> here </a> to verify your email. Then Login. Thanks`
    };
    Transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else {
            console.log("Message sent ");
        }
    });
}
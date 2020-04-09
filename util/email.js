const nodemailer = require('nodemailer');

const sendEmail = (sendTo, senderName, callback) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "wpgusgy@gmail.com",
            pass: "rpdlagkwk13!"
        }
    });

    const mailOptions = {
        from: "Knowledge Base<wpgusgy>@gmail.com>",
        to: sendTo,
        subject: 'You got an new Conversation from KnowledgeBase',
        text: `${senderName} has started an conversation with you`
    };
    transporter.sendMail(mailOptions, callback);
}

exports.sendEmail = sendEmail
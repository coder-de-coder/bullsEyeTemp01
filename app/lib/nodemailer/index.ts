import nodemailer from 'nodemailer';
import { EmailType, EmailContent } from '@/types/email';
import { otpEmailTemplate } from './otpTemplate';

const Email = {
    SUBSCRIBE: "SUBSCRIBE" as EmailType,
    UNSUBSCRIBE: "UNSUBSCRIBE" as EmailType,
    ALERT: "ALERT" as EmailType
};

const transporter = nodemailer.createTransport({
    service: 'Hotmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const generateEmailBody = (type: EmailType, otp?: number, firstName?: string): EmailContent => {
    let subject = '';
    let body = '';

    switch (type) {
        case Email.SUBSCRIBE:
            subject = "Welcome to our subscription!";
            body = `Your OTP code is ${otp}`;
            break;
        case Email.UNSUBSCRIBE:
            subject = "You have unsubscribed";
            body = "We're sorry to see you go. You have successfully unsubscribed.";
            break;
        case Email.ALERT:
            subject = "Important Alert";
            body = "This is an important alert for you.";
            break;
        default:
            throw new Error("Invalid email type");
    }

    return { subject, body };
};

export const sendEmail = async (email: string, subject: string, body: string, otp?: number, firstName?: string) => {
    let htmlContent = body;

    if (otp && firstName && subject === "Welcome to our subscription!") {
        htmlContent = otpEmailTemplate(firstName, otp);
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email' };
    }
};

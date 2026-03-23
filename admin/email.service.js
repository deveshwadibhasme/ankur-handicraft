import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'smtp-relay.brevo.com',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

export const sendInquiryEmail = async (inquiryData) => {
    const { userName, email, number, message, productName } = inquiryData;

    const adminMailOptions = {
        from: 'Ankur Handicrafts <no-reply@ankurhandicraft.com>',
        to: 'ankurhandicrafts1@gmail.com',
        subject: `New Inquiry from ${userName} - Ankur Handicraft`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4f46e5;">New Product Inquiry</h2>
                <p><strong>Customer Name:</strong> ${userName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${number}</p>
                <p><strong>Product Interested:</strong> ${productName || 'General Inquiry'}</p>
                <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #4f46e5;">
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
                <p style="margin-top: 20px; font-size: 0.8em; color: #666;">This email was sent from the Ankur Handicraft contact form.</p>
            </div>
        `,
    };

    const userMailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Thank you for your inquiry - Ankur Handicraft`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4f46e5;">Hello ${userName},</h2>
                <p>Thank you for reaching out to Ankur Handicraft. We have received your inquiry regarding <strong>${productName || 'our products'}</strong>.</p>
                <p>Our team will review your message and get back to you as soon as possible.</p>
                <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #4f46e5;">
                    <p><strong>Your Message:</strong></p>
                    <p>${message}</p>
                </div>
                <p style="margin-top: 20px;">Best Regards,<br><strong>Ankur Handicraft Team</strong></p>
            </div>
        `,
    };

    try {
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);
        return { success: true, message: "Emails sent to admin and user" };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error.message };
    }
};

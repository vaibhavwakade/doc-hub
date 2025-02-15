import nodemailer from 'nodemailer';
import { Document } from '../model/document.modal.js';
import cron from 'node-cron';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Email template for expiry notification
const createEmailContent = (document, daysUntilExpiry) => {
    return {
        subject: `⚠️ Document Expiry Notice: "${document.title}"`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="text-align: center; color: #d9534f;">🚨 Document Expiry Notice</h2>
                <p>Hello,</p>
                <p>We are sending this notification to inform you that your document, "<strong>${document.title}</strong>", will expire in <strong>${daysUntilExpiry} day${daysUntilExpiry > 1 ? 's' : ''}</strong>.</p>
                <p style="font-weight: bold;">Document Details:</p>
                <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Title</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${document.title}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Type</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${document.docType}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Expiry Date</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${document.expiryDate.toLocaleDateString()}</td>
                    </tr>
                </table>
                <p>Please take the necessary actions to renew or manage this document before it expires.</p>
                <p style="margin-top: 20px;">Best regards,<br>Document Management Team</p>
                <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `
    };
};

export const checkAndNotifyExpiringDocuments = async () => {
    try {
        const today = new Date();
        const fiveDaysFromNow = new Date(today);
        fiveDaysFromNow.setDate(today.getDate() + 5);

        // Fetch documents expiring within the next 5 days
        const expiringDocuments = await Document.find({
            expiryDate: {
                $gt: today,
                $lte: fiveDaysFromNow
            },
            status: 'active',
            notificationSent: { $ne: true } 
        }).populate('author', 'email'); 

        for (const document of expiringDocuments) {
            const daysUntilExpiry = Math.ceil(
                (document.expiryDate - today) / (1000 * 60 * 60 * 24)
            );

            const emailContent = createEmailContent(document, daysUntilExpiry);

            // Send email notification
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: document.author.email,
                subject: emailContent.subject,
                html: emailContent.html
            });

            // Mark the document as notified
            document.notificationSent = true;
            await document.save();

            console.log(`Expiry notification sent for document: ${document.title}`);
        }
    } catch (error) {
        console.error('Error in sending expiry notifications:', error);
    }
};

// Schedule the check to run daily at midnight
export const scheduleExpiryNotifications = () => {
    cron.schedule('* * * * *', async () => {
        console.log('Running daily document expiry check...');
        await checkAndNotifyExpiringDocuments();
    });
};

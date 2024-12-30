import sgMail from "@sendgrid/mail";
import ApiError from "./ApiError.js";

sgMail.setApiKey(process.env.SENDGRID_SECRET_API);

export const sendVerificationEmail = async (email, code) => {
    try {
        const msg = {
            to: email,
            from: "ansh.agrawal1_cs22@gla.ac.in", // Use your verified sender
            subject: "Email Verification Code",
            text: `Your verification code is: ${code}`,
            html: `<p>Your verification code is: <strong>${code}</strong></p>`,
        };

        await sgMail.send(msg);
        console.log("Verification email sent!");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new ApiError(500, "Failed to send verification email");
    }
};
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, message, toMail, captchaToken } = await req.json();

        
        if (captchaToken) {
            const captchaVerifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=6LfkzDorAAAAAM4J4aAj8SpWciYo0VbGPAkOpvpO&response=${captchaToken}`,
            });

            const captchaData = await captchaVerifyResponse.json();
            console.log("CAPTCHA Verification Response:", captchaData);

            if (!captchaData.success) {
                return Response.json({ message: "CAPTCHA verification failed", error: captchaData }, { status: 400 });
            }
        }

        const transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mail = {
            from: toMail === "company" ? email : process.env.EMAIL,
            to: toMail === "company" ? process.env.EMAIL : email,
            subject: `Contact Form Submission from ${name}`,
            text: `You have received a message from ${name} (${email}):\n\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #333;">Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${toMail === "user" ? "QuantumCrafters Studio" : name}</p>
                    <p><strong>Email:</strong> ${toMail === "user" ? process.env.EMAIL : email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="border-left: 4px solid #ccc; padding-left: 8px; color: #555;">${message}</p>
                    <hr>
                    <p style="font-size: 0.9em; color: #888;">This is an automated message. Please do not reply.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mail);
        console.log("Mail sent:", info);
        return Response.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in contact API:", error);
        return Response.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}

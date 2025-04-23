import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import nodemailer from "nodemailer"

export const POST = async(req)=>{

    try {
        
        await connectDB();

        const data = await req.json();
        console.log("User Email Data :" ,data);
        const email = data?.email;
        const password =  data?.password;
        
        // const userData = await User.find({email});

        const transporter = nodemailer.createTransport({
            host:"smtpout.secureserver.net",
            port:587,
            secure:false,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }

        });

        const html_template = `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f3f4f6; padding:40px 0; font-family:'Segoe UI', sans-serif;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6); padding:32px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:26px; font-weight:600;">🎉 Welcome Aboard!</h1>
                <p style="margin:8px 0 0; font-size:16px; font-weight:400;">Your account has been successfully created.</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px;">
                <p style="margin:0 0 16px; font-size:16px; color:#374151;">Hi there 👋,</p>
                <p style="margin:0 0 24px; font-size:16px; color:#374151;">
                  We're thrilled to have you join us. Below are your login credentials to access your account:
                </p>

                <!-- Credentials Box -->
                <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:10px; padding:20px; margin-bottom:30px;">
                  <p style="margin:0 0 8px; font-size:16px; font-family:monospace;"><strong>Email:</strong> ${email}</p>
                  <p style="margin:0; font-size:16px; font-family:monospace;"><strong>Password:</strong> ${password}</p>
                </div>

                <!-- CTA Button -->
                <a href="https://elevatrx.app/login" target="_blank" style="display:inline-block; background-color:#4f46e5; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:10px; font-weight:600; font-size:16px;">
                  🔐 Log In to Your Account
                </a>

                <p style="margin-top:32px; font-size:15px; color:#6b7280;">
                  If you run into any issues, feel free to reach out to our support team — we're here to help.
                </p>

                <p style="margin-top:24px; font-size:15px; color:#374151;">Cheers,<br/><strong>The Team 🚀</strong></p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align:center; font-size:13px; color:#9ca3af; padding:24px;">
                © 2025 Elevatrx · All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>`;

    const responseMail = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject:"Elevatrx Account Crediantials",
        html: html_template,
    });

    return Response.json({message:"crediantials send successfully",success:true,status:201},{status:201});

    } catch (error) {
        console.log("Unable to share crediantials",error);
        return Response.json({message:"Server Error Unable to share crediantials!",success:false,status:500},{status:500});
    }

}   
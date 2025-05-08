import User from '@/models/user.schema';
import crypto from 'crypto';
import nodemailer from "nodemailer";


export const POST = async(req)=> {

    try {
        
        const rawBody = await req.text();
        const signature = req.headers.get('x-razorpay-signature');

        const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRATE)
        .update(rawBody)
        .digest('hex');

        if (signature !== expectedSignature) {
            console.error('Invalid signature');
            return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 });
        }

        const event = JSON.parse(rawBody);
        console.log('Webhook event received:', event);
        console.log("Full subscription entity:", event.payload.subscription.entity);

        if (event.event === 'subscription.charged') {
            const invoice_id = event.payload.payment.entity.invoice_id;
            const status = event.payload.subscription.entity.status;

            const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

            // Invoice PDF link
            const invoiceResponse = await fetch(`https://api.razorpay.com/v1/invoices/${invoice_id}`,{
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
            });
            if(invoiceResponse.status === 200){
                const invoiceData = await invoiceResponse.json();
                const invoiceURL = invoiceData?.short_url;
                const customerDetail = invoiceData?.customer_details;
                const customerEmail = customerDetail?.email;

                // update user:
                const paymentDetail = {status, invoiceURL};

                const userDetail = await User.findOneAndUpdate({email:customerEmail},{$push:{paymentData:paymentDetail}},{new:true});
                
                // Send Mail 
                const emailResponse = sendMail(customerEmail,invoiceURL);
                if(emailResponse){
                    console.log("Email Send Successfully");
                }else{
                    console.log("unable To Send Email");
                }
            }

            const subscriptionId = event.payload.subscription.entity.id;
            const paymentId = event.payload.payment.entity.id;

            console.log(`Subscription charged: ${subscriptionId}, Payment ID: ${paymentId}`);
        }

        return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });

    } catch (error) {
        console.error('Webhook error:', error);
        return Response.json({ error: 'Webhook error' },{ status: 500 });
    }

}

export const sendMail = async(customerEmail,invoiceURL) => {
    try {
        
        const transporter = nodemailer.createTransport({
            host:"smtpout.secureserver.net",
            port:587,
            secure:false,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const html_template = `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:50px 0; font-family:'Segoe UI', sans-serif;">
            <tr>
            <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:50px 0; font-family:'Segoe UI', sans-serif;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.07);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background:linear-gradient(135deg, #6366f1, #8b5cf6); padding:40px; text-align:center; color:#ffffff;">
                                <h1 style="margin:0; font-size:28px; font-weight:700;">🧾 Payment Successful!</h1>
                                <p style="margin:8px 0 0; font-size:16px; font-weight:400;">Here’s your invoice for the recent transaction.</p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:40px;">
                                <p style="margin:0 0 18px; font-size:16px; color:#374151;">Hello 👋,</p>
                                <p style="margin:0 0 24px; font-size:16px; color:#374151;">
                                Thank you for your payment. Your invoice is ready and can be downloaded securely from the link below:
                                </p>

                                <!-- Full-Width Button -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                                <tr>
                                    <td>
                                    <a href="${invoiceURL}" target="_blank" style="display:block; text-align:center; background-color:#4f46e5; color:#ffffff; text-decoration:none; padding:16px 0; border-radius:12px; font-weight:600; font-size:16px;">
                                        📎 Download Your Invoice
                                    </a>
                                    </td>
                                </tr>
                                </table>

                                <p style="margin-top:32px; font-size:15px; color:#6b7280;">
                                Need help? Just reply to this email or contact our support team anytime.
                                </p>

                                <p style="margin-top:30px; font-size:15px; color:#374151;">Warm regards,<br/><strong>The Elevatrx Team 🚀</strong></p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="text-align:center; font-size:13px; color:#9ca3af; padding:24px; background-color:#f9fafb;">
                                © 2025 Elevatrx · All rights reserved.<br/>
                                <a href="https://elevatrx.app" target="_blank" style="color:#9ca3af; text-decoration:none;">Visit our website</a>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>`;

        const responseMail = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: customerEmail,
            subject:"Elevatrx Subscription Invoice",
            html: html_template,
        });

        return true;
    } catch (error) {
        console.log("Server error Unbale to send Mail");
        return false;
    }
}
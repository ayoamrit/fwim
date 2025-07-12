import nodemailer from "nodemailer";

export default async function handler(req, res){
    if(req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const {name, email, phone, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,   
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `New Immigration Inquiry from ${name}`,
        text: `Phone: ${phone}\n\n${message}`,
    };

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({success: true});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
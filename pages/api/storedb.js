import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
// var mail = require('./config/mailer')();
// mail.send();
export default async function handler(req, res){
    try{
        let {wetLevel, dryLevel, userId} = req.body;
        const newWetLevel = await prisma.wetLevels.create({data : {level :wetLevel , userId}});
        const newDryLevel = await prisma.dryLevels.create({data : {level :dryLevel , userId}});
        
        // if (wetLevel >= 100 || dryLevel >= 100) {
        //     const transporter = nodemailer.createTransport({
        //         service: 'gmail',
        //         auth: {
        //             user: 'pathuri.sanketh@gmail.com',
        //             pass: 'legendarychinnu'
        //         }
        //     });

        //     const mailOptions = {
        //         from: 'sanketh7422@gmail.com',
        //         to: email, // Corrected the 'to' field
        //         subject: 'Alert: Level Above 100',
        //         text: `Dear user, Your wet level or dry level is above 100. Please take necessary actions.`,
        //     };
        //     transporter.sendMail(mailOptions, function(error, info) {
        //         if (error) {
        //             console.log("Error sending email:", error);
        //         } else {
        //             console.log("Email sent:", info.response);
        //         }
        //     });
        // }
        
        if(newDryLevel && newWetLevel){
            return res.status(200).json({message : "successfully added"})
        } else {
            return res.status(400).json({message : "something went wrong"})
        }
    } catch(error) {
        console.log("an error has occurred : ", error);
        return res.status(400).json({message : "an error has occurred", error});    
    }
}

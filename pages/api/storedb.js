import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();
export default async function handler(req, res){
    try{
        let {wetLevel, dryLevel, userId} = req.body;
        const newWetLevel = await prisma.wetLevels.create({data : {level :wetLevel , userId}})
        const newDryLevel = await prisma.dryLevels.create({data : {level :dryLevel , userId}})
        if(newDryLevel && newWetLevel){
            return res.status(200).json({message : "successfully added"})
        }else{
            return res.status(400).json({message : "something went wrong"})
        }
    }catch(error){
        console.log("an error has occured : ",error);
        return res.status(400).json({message : "an error has occuerd", error});    
    }
}
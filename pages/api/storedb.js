import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();
export default async function handler(req, res){
    try{
        const {query} = req;
        let level = query.level;
        const userId = query.userId
        level = Number(level);
        const newLevel = await prisma.levels.create({data : {level,userId}})
        if(newLevel){
            return res.status(200).json({message : "successfully added"})
        }else{
            return res.status(400).json({message : "something went wrong"})
        }
    }catch(error){
        console.log("an error has occured : ",error);
        return res.status(400).json({message : "an error has occuerd", error});    
    }
}
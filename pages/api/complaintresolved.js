import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient();

export default async function handler(req, res){
    try{
        let {complaintId} =req.body;
        const complaint = await prisma.complaint.update({ where : {id : complaintId},data : {resolved : true}}); 
        if(complaint){
            return res.status(200).json({message : "complaint resolved"});
        }
    }catch(error){
        console.log(`an error has occured over here : `,error)
        return res.status(400).json({error});
    }
}
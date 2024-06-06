import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req,res){
 const complaints =  await prisma.complaint.findMany({ include : {PostedBy : true} , where : {resolved : false}});
 return res.status(200).json({complaints});
}
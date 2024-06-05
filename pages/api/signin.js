import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export default async function handler(req , res) {
  const SecretKey = "mini-project";
  try {
    let { username, password } = req.body;
    const user = await prisma.user.findUnique({ where : {username} });
    if (user) {
      return res.status(200).json({ message: "username already exists !!!" });
    } else {
      let newUser = await prisma.user.create({data : {username, password}});
      let token = jwt.sign(newUser.id, SecretKey);
      if(newUser){
        return res.status(200).json({ message: "signed in", token });
      }
      else{
        return res.status(400).json({message : "unsuccessful"})
      }
    }
  } catch (error) {
    console.log("an error has occured over here : ", error);
    return res.status(400).json({message : "an error has occured",error});
  }
}

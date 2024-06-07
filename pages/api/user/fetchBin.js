import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  try {
    let { token } = req.body;
    let userId = jwt.decode(token);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { wetLevel: true,dryLevel : true ,  complaints: true },
    });
    if (user) {
      return res.status(200).json({ message: "user found", user });
    }
    return res.status(200).json({ message: "no user found" });
  } catch (error) {
    console.log("an error has occured here : ", error);
    return res.status(400).json({ message: "an error has occured here" });
  }
}

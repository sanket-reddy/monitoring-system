import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    let { title, description, token } = req.body;

    let userId = jwt.decode(token);
    const complaint = await prisma.complaint.create({
      data: { title, description, userId },
    });
    if (complaint) {
      return res.status(200).json({ message: "complaint registered" });
    } else {
      return res.status(200).json({ message: "complaint couldn't registered" });
    }
  } catch (error) {
    console.log("an error has occured  : ", error);
    return res
      .status(400)
      .json({ message: "an error has occured here", error });
  }
}

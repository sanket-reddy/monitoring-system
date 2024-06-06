import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log("handler reached")
    const SecretKet = "mini-project";
  try {
    const { name, password } = req.body;
    const user = await prisma.monitor.findUnique({
      where: { name, password },
    });
    if (user) {
       let token = jwt.sign(user.id, SecretKet)
      return res.status(200).json({ message: "user found",token });
    }
    return res.status(404).json({ message: "invalid credentials" });
  } catch (error) {
    console.log(`an error has occured ${error}`);
    return res.status(400).json({ message: "something went wrong" });
  }
}

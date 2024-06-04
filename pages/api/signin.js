import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req , res) {
  try {
    let { username, password } = req.body;
    const user = await prisma.user.create({ data: { username, password } });
    if (user) {
      return res.status(200).json({ message: "successful" });
    } else {
      return res.status(400).json({ message: "unsuccesful" });
    }
  } catch (error) {
    console.log("an error has occured over here : ", error);
    return res.status(400).json({message : "an error has occured",error});
  }
}

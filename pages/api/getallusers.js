import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: { dryLevel: true, wetLevel: true },
    });
    if (users) {
      return res.status(200).json({ users });
    } else {
      return res.status(200).json({ message: "no users found" });
    }
  } catch (error) {
    console.log("an error has occurd here : ", error);
    return res.status(400).json({ error });
  }
}

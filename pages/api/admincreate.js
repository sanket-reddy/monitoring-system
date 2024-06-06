import prisma from "@/libs/prismadb"
export default async function handler(req, res) {
  try {
    let { name, password } = req.body;

    // let found = await prisma.monitor.findUnique({ where: { name } });
    // if (found) {
    //   return res.status(200).json({ message: "Admin already exists" });
    // }

    const admin = await prisma.monitor.create({ data: { name, password } });
    if (admin) {
      return res.status(200).json({ message: "Admin registered" });
    } else {
      return res.status(400).json({ message: "Try again" });
    }
  } catch (error) {
    console.log("An error has occurred here", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

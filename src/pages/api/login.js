import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const loginHandler = async (req, res) => {
    const { username, pass } = req.query
    const savedPass = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            pass: true
        }
    }).then(res => {
        return res ? res.pass : null
    })
    pass === savedPass ? res.status(200).json({ auth: true }) : res.status(401).json({ auth: false })
}

export default loginHandler
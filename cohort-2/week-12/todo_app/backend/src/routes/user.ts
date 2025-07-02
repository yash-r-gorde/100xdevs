import express from "express"
import dotenv from "dotenv"
const router = express.Router()
import { userSchema } from "../types"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { json } from "zod/v4"
import { Request, Response } from "express"
import { authCheckMiddleware } from "../middleware/authCheckMiddleware"

dotenv.config();

const prisma = new PrismaClient()


router.get('/me', authCheckMiddleware, async (req: Request, res: Response) => {
    const user = await prisma.user.findFirst({
        where: {
            id: req.userId
        }, 
        include: {
            todos: true
        }
    })

    if(!user) {
        return res.status(400).json({
            message: "User doesn't exits"
        })
    }

    res.status(200).json(user)
})

router.post('/signup', async (req: Request, res: Response) => {
    const body = req.body
    const { success } = userSchema.safeParse(body)
    if (!success) {
        return res.status(400).json({
            messsage: "Incorrect inputs"
        })
    }
    const { username, password } = body

    const existingUser = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if (existingUser) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: await bcrypt.hash(password, 10)
        }
    })

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET as string);

    return res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin', async (req: Request, res: Response) => {
    const { success } = userSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }
    const { username, password } = req.body
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if (user) {
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                message: "Incorrect inputs"
            })
        }
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string)
    return res.status(200).json({
        token
    })
})



export default router
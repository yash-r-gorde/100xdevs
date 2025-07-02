import express from "express"
import { Request, Response } from "express";
import { authCheckMiddleware } from "../middleware/authCheckMiddleware"
import { todoSchema, updateTodoSchema, deleteTodoSchema } from "../types";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const router = express.Router();

router.post('/add', authCheckMiddleware, async (req: Request, res: Response) => {
    const { success } = todoSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "Invalid request body"
        })
    }
    const { title, description } = req.body

    await prisma.todo.create({
        data: {
            title: title,
            description: description,
            userId: req.userId
        }
    })

    res.status(200).json({
        message: "Todo created successfully"
    })

})

router.put('/update', authCheckMiddleware, async (req: Request, res: Response) => {
    const { success } = updateTodoSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "Invalid request body"
        })
    }

    await prisma.todo.update({
        where: {
            id: req.body.id
        },
        data: req.body
    })

    res.status(200).json({
        message: "Updated successfully"
    })
})

router.delete('/delete', authCheckMiddleware, async (req: Request, res: Response) => {
    const { success } = deleteTodoSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "Invalid request body"
        })
    }

    await prisma.todo.delete({
        where: {
            id: req.body.id
        }
    })
    res.status(200).json({
        message: "Deleted successfully"
    })
})

export default router
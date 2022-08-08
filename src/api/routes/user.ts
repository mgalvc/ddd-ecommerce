import { Request, Response, Router } from "express";
import PrismaRepository from "../../users/adapters/repository/prisma.repository";
import register from "../../users/usecases/register";

const userRouter = Router()

userRouter.post('/', async (req: Request, res: Response) => {
  const { body: user } = req
  try {
    await register({
      email: user.email,
      name: user.name
    }, new PrismaRepository())
    return res.status(201).end()
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
})

export default userRouter
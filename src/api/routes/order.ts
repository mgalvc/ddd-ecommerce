import { Request, Response, Router } from "express";
import { body } from "express-validator";
import createOrder from "../../orders/usecases/create";
import ProductRepository from "../../products/adapters/repository/prisma.repository";
import UserRepository from "../../users/adapters/repository/prisma.repository";
import OrderRepository from "../../orders/adapters/repository/prisma.repository";
import validatorMiddleware from "../middlewares/validator";

const orderRouter = Router()

const validator = [
  body('productId').notEmpty(),
  body('buyerId').notEmpty(),
  body('amount').isInt({ min: 1 }),
]

orderRouter.post(
  '/', 
  validator, 
  validatorMiddleware, 
  async (req: Request, res: Response) => {
    const { body: order } = req
    const orderId = await createOrder(order.productId, order.buyerId, order.amount, new ProductRepository(), new UserRepository(), new OrderRepository())
    return res.status(201).json(orderId)
})

export default orderRouter
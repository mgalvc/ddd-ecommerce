import { Request, Response, Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import PrismaRepository from "../../products/adapters/repository/prisma.repository";
import S3Storage from "../../products/adapters/storage/s3.storage";
import register from "../../products/usecases/register";
import validatorMiddleware from "../middlewares/validator";

const fileUpload = multer({ storage: multer.memoryStorage() })

const productRouter = Router()

const validator = [
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('rating').isIn([0, 1, 2, 3, 4, 5]),
  body('price').isFloat(),
  body('brand').notEmpty(),
  body('stock').isInt({ min: 0 }),
  body('sellerId').notEmpty()
]

productRouter.post(
  '/', 
  fileUpload.single('picture'),
  validator, 
  validatorMiddleware, 
  async (req: Request, res: Response) => {
    const { body: product } = req
    await register({
      ...product,
      price: parseFloat(product.price),
      rating: parseInt(product.rating),
      stock: parseInt(product.stock),
      pictureBuffer: req.file!.buffer
    }, new PrismaRepository(), new S3Storage())
    return res.status(201).end()
})

export default productRouter
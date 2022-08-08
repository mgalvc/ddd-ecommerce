import { randomUUID } from "crypto";
import ProductRepository from "../adapters/repository/product.repository";
import BaseStorage from "../adapters/storage/base.storage";
import Product from "../domain/Product";
import ProductDTO from "./dto/product.dto";

export default async function register(productDto: ProductDTO, repository: ProductRepository, storage: BaseStorage): Promise<void> {
  const picturePath = await storage.addFile(productDto.pictureBuffer, randomUUID())
  const product = new Product(productDto.name, productDto.description, productDto.rating, productDto.price, productDto.brand, picturePath, productDto.stock, productDto.sellerId)
  await repository.add(product)
}
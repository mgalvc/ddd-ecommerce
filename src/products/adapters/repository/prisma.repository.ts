import { PrismaClient } from "@prisma/client";
import Product from "../../domain/Product";
import ProductRepository from "./product.repository";

class ClientFactory {
  private static instance: PrismaClient

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new PrismaClient()
    }

    return this.instance
  }
}

export default class PrismaRepository implements ProductRepository {
  public constructor(
    private client = ClientFactory.getInstance()
  ) {}
  
  async getById(id: string): Promise<Product> {
    await this.client.$connect()
    const product = await this.client.product.findUniqueOrThrow({ where: { id } })
    this.client.$disconnect()
    return new Product(product.name, product.description, product.rating, product.price, product.brand, product.picture, product.stock, product.sellerId, product.id)
  }

  async update(product: Product): Promise<void> {
    await this.client.$connect()

    await this.client.product.update({ where: { id: product.id }, data: {
      brand: product.brand,
      description: product.description,
      name: product.name,
      picture: product.picture, 
      price: product.price,
      rating: product.rating,
      sellerId: product.sellerId,
      stock: product.stock
    }})

    await this.client.$disconnect()
  }

  async add(product: Product): Promise<void> {
    await this.client.$connect()
    await this.client.product.create({
      data: {
        brand: product.brand,
        description: product.description,
        name: product.name,
        picture: product.picture,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        sellerId: product.sellerId
      }
    })
    this.client.$disconnect()
  }
}
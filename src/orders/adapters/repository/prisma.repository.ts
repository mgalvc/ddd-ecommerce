import { PrismaClient } from "@prisma/client";
import Order from "../../domain/Order";
import OrderRepository from "./order.repository";

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

export default class PrismaRepository implements OrderRepository {
  public constructor(
    private client = ClientFactory.getInstance()
  ) {}

  async add(order: Order): Promise<string> {
    await this.client.$connect()
    const { id } = await this.client.order.create({
      data: {
        amount: order.amount,
        buyerId: order.buyer.id as string, 
        productId: order.product.id as string
      }
    })
    this.client.$disconnect()
    return id
  }
}
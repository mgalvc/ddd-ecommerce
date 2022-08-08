import { PrismaClient } from "@prisma/client";
import User from "../../domain/User";
import UserRepository from "./user.repository";

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

export default class PrismaRepository implements UserRepository {
  public constructor(
    private client = ClientFactory.getInstance()
  ) {}

  async findById(id: string): Promise<User> {
    await this.client.$connect()
    const user = await this.client.user.findUniqueOrThrow({ where: { id } })
    return new User(user.name, user.email, user.id)
  }
  
  async findByEmail(email: string): Promise<User | undefined> {
    await this.client.$connect()
    const user = await this.client.user.findUnique({ where: { email } })
    return user ? new User(user.name, user.email, user.id) : undefined
  }

  async add(user: User): Promise<void> {
    await this.client.$connect()
    await this.client.user.create({
      data: {
        email: user.email,
        name: user.name
      }
    })
    this.client.$disconnect()
  }
}
import Product from "../../products/domain/Product";
import User from "../../users/domain/User";

export default class Order {
  public constructor(
    public product: Product,
    public buyer: User,
    public amount: number,
    public id?: string,
  ) {}

  public validate(): void {
    if (this.amount > this.product.stock) {
      throw new Error(`#${this.product.id} ${this.product.name} is out of stock`)
    }
  }
}
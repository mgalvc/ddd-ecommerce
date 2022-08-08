export default class Product {
  public constructor(
    public name: string,
    public description: string,
    public rating: number,
    public price: number,
    public brand: string,
    public picture: string,
    public stock: number,
    public sellerId: string,
    public id?: string
  ) {}

  public takeFromStock(amount: number) {
    this.stock -= amount
  }
}
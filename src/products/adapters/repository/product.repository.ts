import Product from "../../domain/Product";

export default interface ProductRepository {
  add(product: Product): Promise<void>
  getById(id: string): Promise<Product>
  update(product: Product): Promise<void>
}
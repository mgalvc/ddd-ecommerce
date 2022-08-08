import ProductRepository from "../../products/adapters/repository/product.repository";
import UserRepository from "../../users/adapters/repository/user.repository";
import OrderRepository from "../adapters/repository/order.repository";
import Order from "../domain/Order";

export default async function createOrder(productId: string, buyerId: string, amount: number, productRepository: ProductRepository, userRepository: UserRepository, orderRepository: OrderRepository) {
  const product = await productRepository.getById(productId)
  const buyer = await userRepository.findById(buyerId)
  const order = new Order(product, buyer, amount)
  
  order.validate()
  product.takeFromStock(amount)

  await productRepository.update(product)
  const id = await orderRepository.add(order as any)
  
  return id
}
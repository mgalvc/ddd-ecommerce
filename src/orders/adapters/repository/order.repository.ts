import Order from "../../domain/Order";

export default interface OrderRepository {
  add(order: Order): Promise<string>
}
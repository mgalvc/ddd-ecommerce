import User from "../../domain/User";

export default interface UserRepository {
  add(user: User): Promise<void>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User>
}
import UserRepository from "../adapters/repository/user.repository";
import User from "../domain/User";
import UserDTO from "./dto/user.dto";

export default async function register(userDto: UserDTO, repository: UserRepository): Promise<void> {
  const user = new User(userDto.name, userDto.email)

  const userWithSameEmail = await repository.findByEmail(user.email)

  if (userWithSameEmail) {
    throw new Error('There is a user with this email')
  }

  await repository.add(user)
}
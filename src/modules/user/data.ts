import UserModel from "./schema/user";
import { RawUser, User } from "./types/user";

export async function findUsers(query: any): Promise<RawUser[]> {
  const users = await UserModel.find(query);
  return users;
}

export async function insertUser(userPayload: User): Promise<RawUser | null> {
  const category = new UserModel({
    firstName: userPayload.firstName,
    lastName: userPayload.lastName,
    email: userPayload.email,
    password: userPayload.password,
    role: userPayload.role,
  });
  const { _id } = await category.save();
  const user: RawUser | null = await findOneUser(_id.toString());
  return user;
}

export async function findOneUser(id: string): Promise<RawUser | null> {
  const user: RawUser | null = await UserModel.findById(id);
  return user;
}

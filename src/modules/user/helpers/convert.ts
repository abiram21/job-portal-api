import { RawUser, User } from "../types/user";

const convert = (rawUser: RawUser) => {
  const user: User = {
    id: rawUser._id,
    firstName: rawUser.firstName,
    lastName: rawUser.lastName,
    email: rawUser.email,
    role: rawUser.role,
    createdAt: rawUser.createdAt,
  };
  return user;
};

export default convert;

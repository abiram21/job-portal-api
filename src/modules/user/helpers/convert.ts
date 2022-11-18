import { RawUser, User } from "../model/type";

const convert = (rawUser: RawUser) => {
  const user: User = {
    id: rawUser._id,
    firstName: rawUser.firstName,
    lastName: rawUser.lastName,
    email: rawUser.email,
    password: rawUser.password,
    createdAt: rawUser.createdAt,
  };
  return user;
};

export default convert;

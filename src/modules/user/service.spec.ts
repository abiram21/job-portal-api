import { ObjectId } from "mongodb";
import * as userData from "./data";
import service from "./service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const rawUser: any = {
  _id: new ObjectId("63785b41294b379c837ecd2b"),
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  password: "1#@21skae123213213n12n312312@#!",
  role: "USER",
  createdAt: new Date("2022-11-18T17:08:45.430+00:00"),
};
const user: any = {
  id: new ObjectId("63785b41294b379c837ecd2b"),
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  role: "USER",
  createdAt: new Date("2022-11-18T17:08:45.430+00:00"),
};

describe("job.service.getUser()", () => {
  let mockRequest: any;
  let findOneMock: any;
  beforeEach(() => {
    mockRequest = {
      userData: {
        userId: "63785b41294b379c837ecd2b",
      },
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with correct response", async () => {
    findOneMock = jest
      .spyOn(userData, "findOneUser")
      .mockResolvedValue(rawUser);
    const response = await service.getUser(mockRequest);
    expect(findOneMock).toBeCalledTimes(1);
    expect(response).toEqual(user);
  });

  it("should throw error if no job is found for given id", async () => {
    mockRequest = {
      userData: {
        userId: "63785b41294b379c837ecd2c",
      },
    };
    await expect(service.getUser(mockRequest)).rejects.toThrow(
      "User not found"
    );
  });
});
describe("job.service.saveUser()", () => {
  let mockRequest: any;
  let saveUserMock: any;
  let findUsersMock: any;
  beforeEach(() => {
    jest.clearAllMocks();
    saveUserMock = jest
      .spyOn(userData, "insertUser")
      .mockResolvedValue(rawUser);
    findUsersMock = jest.spyOn(userData, "findUsers").mockResolvedValue([]);
    mockRequest = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        password: "Aureus@123",
        role: "USER",
      },
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with correct response", async () => {
    const response = await service.saveUser(mockRequest);
    expect(saveUserMock).toBeCalledTimes(1);
    expect(response).toEqual(user);
  });
  it("should throw error if title is not provided", async () => {
    delete mockRequest.body.firstName;
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "First name is required"
    );
  });
  it("should throw error if first name above 30 characters", async () => {
    mockRequest.body.firstName =
      "this is a 30 charcters long string to check the first name";
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "First name should have a maximum length of 30"
    );
  });
  it("should throw error if email is not provided", async () => {
    delete mockRequest.body.email;
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Email is required"
    );
  });
  it("should throw error if password is not provided", async () => {
    delete mockRequest.body.password;
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Password is required"
    );
  });

  it("should throw error if role is not provided", async () => {
    delete mockRequest.body.role;
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Role is required"
    );
  });

  it("should throw error if email is already registered", async () => {
    findUsersMock.mockResolvedValue([rawUser]);
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "User already exists"
    );
  });
  it("should throw error if password doesn't contain atleast one uppercase letter", async () => {
    mockRequest.body.password = "abiram123@#hello";
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Password should contain atleat 1 uppercase, 3 lowercase, 1 special character, 2 numbers and minimum 8 characters"
    );
  });
  it("should throw error if password doesn't contain atleast three lowercase letter", async () => {
    mockRequest.body.password = "abiram123@#hello";
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Password should contain atleat 1 uppercase, 3 lowercase, 1 special character, 2 numbers and minimum 8 characters"
    );
  });
  it("should throw error if password doesn't contain atleast two digits", async () => {
    mockRequest.body.password = "abiram123@#hello";
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Password should contain atleat 1 uppercase, 3 lowercase, 1 special character, 2 numbers and minimum 8 characters"
    );
  });
  it("should throw error if password doesn't contain atleast one special character", async () => {
    mockRequest.body.password = "abiram123@#hello";
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Password should contain atleat 1 uppercase, 3 lowercase, 1 special character, 2 numbers and minimum 8 characters"
    );
  });
  it("should throw error if password is not 8 characters long", async () => {
    mockRequest.body.password = "Abir@12";
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Password should contain atleat 1 uppercase, 3 lowercase, 1 special character, 2 numbers and minimum 8 characters"
    );
  });
  it("should throw error if role is not either ADMIN or USER", async () => {
    mockRequest.body.role = "CUSTOMER";
    await expect(service.saveUser(mockRequest)).rejects.toThrow(
      "Role should be either 'ADMIN' or 'USER'"
    );
  });
});

describe("job.service.login()", () => {
  let mockRequest: any;
  let findUsersMock: any;
  let jwtSignMock: any;
  let bcryptCompareMock: any;
  const token = "token";
  const loginResponse = {
    userId: "63785b41294b379c837ecd2b",
    token: token,
  };
  beforeEach(async () => {
    jest.clearAllMocks();
    findUsersMock = jest
      .spyOn(userData, "findUsers")
      .mockResolvedValue([rawUser]);
    jwtSignMock = jest.spyOn(jwt, "sign").mockReturnValueOnce(token as never);
    bcryptCompareMock = jest
      .spyOn(bcrypt, "compare")
      .mockReturnValueOnce(true as never);
    mockRequest = {
      body: {
        email: "john@gmail.com",
        password: "Aureus@123",
      },
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with correct response", async () => {
    const response = await service.login(mockRequest);
    expect(jwtSignMock).toBeCalledTimes(1);
    expect(response).toEqual(loginResponse);
  });
  it("should throw error if email is not provided", async () => {
    delete mockRequest.body.email;
    await expect(service.login(mockRequest)).rejects.toThrow(
      "Email is required"
    );
  });
  it("should throw error if password is not provided", async () => {
    delete mockRequest.body.password;
    await expect(service.login(mockRequest)).rejects.toThrow(
      "Password is required"
    );
  });
  it("should throw error if email is not registered", async () => {
    findUsersMock.mockResolvedValue([]);
    await expect(service.login(mockRequest)).rejects.toThrow(
      "Invalid credentials"
    );
  });
});

import service from "./service";
import * as jobData from "./data";
import * as applicationData from "../job-application/data";
import { ObjectId } from "mongodb";

const rawJob = {
  _id: new ObjectId("63785b41294b379c837ecd2b"),
  title: "Software engineer",
  description: "2 years experience",
  active: true,
  company: "Aureus",
  salary: 7000,
  createdAt: new Date("2022-11-18T17:08:45.430+00:00"),
  image:
    "src/assets/1668832065090screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
};
const job = {
  id: new ObjectId("63785b41294b379c837ecd2b"),
  title: "Software engineer",
  description: "2 years experience",
  active: true,
  company: "Aureus",
  salary: 7000,
  postedAt: new Date("2022-11-18T17:08:45.430+00:00"),
  image:
    "http://localhost:3000/src/assets/1668832065090screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
};

describe("job.service.getJobs()", () => {
  let mockRequest = {};
  const dbJobsResponse = [
    {
      _id: new ObjectId("63785b41294b379c837ecd2b"),
      title: "Software engineer",
      description: "2 years experience",
      active: true,
      company: "Aureus",
      salary: 7000,
      createdAt: new Date("2022-11-18T17:08:45.430+00:00"),
      image:
        "src/assets/1668832065090screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
    },
    {
      _id: new ObjectId("63785e4835186760e6997451"),
      title: "Senior Software engineer",
      description: "1 years experience",
      active: true,
      company: "Aureus",
      salary: 80000,
      createdAt: new Date("2022-11-18T17:08:45.430+00:00"),
      image:
        "src/assets/1668832840414screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
    },
  ];
  const jobsResponse = [
    {
      id: new ObjectId("63785b41294b379c837ecd2b"),
      title: "Software engineer",
      description: "2 years experience",
      active: true,
      company: "Aureus",
      salary: 7000,
      postedAt: new Date("2022-11-18T17:08:45.430+00:00"),
      image:
        "http://localhost:3000/src/assets/1668832065090screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
    },
    {
      id: new ObjectId("63785e4835186760e6997451"),
      title: "Senior Software engineer",
      description: "1 years experience",
      active: true,
      company: "Aureus",
      salary: 80000,
      postedAt: new Date("2022-11-18T17:08:45.430+00:00"),
      image:
        "http://localhost:3000/src/assets/1668832840414screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
    },
  ];
  const spy = jest.spyOn(jobData, "findJobs").mockResolvedValue(dbJobsResponse);

  it("should resolve with true and valid userId for hardcoded token", async () => {
    const response = await service.getJobs(mockRequest);
    expect(spy).toBeCalledTimes(1);
    expect(response).toEqual(jobsResponse);
  });
});
describe("job.service.getJob()", () => {
  let mockRequest: any;
  let findOneMock: any;
  beforeEach(() => {
    mockRequest = {
      params: {
        id: "63785b41294b379c837ecd2b",
      },
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with correct response", async () => {
    findOneMock = jest.spyOn(jobData, "findOneJob").mockResolvedValue(rawJob);
    const response = await service.getJob(mockRequest);
    expect(findOneMock).toBeCalledTimes(1);
    expect(response).toEqual(job);
  });

  it("should throw error if invalid id is passed", async () => {
    mockRequest = {
      params: {
        id: "63785b41294b379c837ecd2",
      },
    };
    await expect(service.getJob(mockRequest)).rejects.toThrow("Invalid job id");
  });

  it("should throw error if no job is found for given id", async () => {
    mockRequest = {
      params: {
        id: "63785b41294b379c837ecd2c",
      },
    };
    findOneMock = jest.spyOn(jobData, "findOneJob").mockResolvedValue(null);
    await expect(service.getJob(mockRequest)).rejects.toThrow("Job not found");
  });
});
describe("job.service.saveJob()", () => {
  let mockRequest: any = {
    body: {
      title: "Software engineer",
      description: "2 years experience",
      active: true,
      company: "Aureus",
      salary: 7000,
    },
    file: {
      path: "src/assets/1668832065090screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
    },
  };
  let insertJobMock: any;
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      body: {
        title: "Software engineer",
        description: "2 years experience",
        active: true,
        company: "Aureus",
        salary: 7000,
      },
      file: {
        path: "src/assets/1668832065090screencapture-mail-google-mail-u-0-2022-11-03-10_45_49.png",
      },
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with correct response", async () => {
    insertJobMock = jest.spyOn(jobData, "insertJob").mockResolvedValue(rawJob);
    const response = await service.saveJob(mockRequest);
    expect(insertJobMock).toBeCalledTimes(1);
    expect(response).toEqual(job);
  });
  it("should throw error if title is not provided", async () => {
    delete mockRequest.body.title;
    await expect(service.saveJob(mockRequest)).rejects.toThrow(
      "Title is required"
    );
  });
  it("should throw error if description is not provided", async () => {
    delete mockRequest.body.description;
    await expect(service.saveJob(mockRequest)).rejects.toThrow(
      "Description is required"
    );
  });
  it("should throw error if image is not provided", async () => {
    delete mockRequest.file.path;
    await expect(service.saveJob(mockRequest)).rejects.toThrow(
      "Image is required"
    );
  });
  it("should throw error if active is not provided", async () => {
    delete mockRequest.body.active;
    await expect(service.saveJob(mockRequest)).rejects.toThrow(
      "Active is required"
    );
  });
  it("should throw error if company is not provided", async () => {
    delete mockRequest.body.company;
    await expect(service.saveJob(mockRequest)).rejects.toThrow(
      "Company is required"
    );
  });
  it("should throw error if salary is not provided", async () => {
    delete mockRequest.body.salary;
    await expect(service.saveJob(mockRequest)).rejects.toThrow(
      "Salary is required"
    );
  });
});

describe("job.service.deleteJob()", () => {
  let mockRequest: any;
  let findOneMock: any;
  let updateApplicationMock: any;
  let removeJobMock: any;
  beforeEach(() => {
    findOneMock = jest.spyOn(jobData, "findOneJob").mockResolvedValue(rawJob);
    updateApplicationMock = jest
      .spyOn(applicationData, "updateApplication")
      .mockResolvedValue({
        matchedCount: 1,
        modifiedCount: 1,
        acknowledged: true,
      } as any);
    removeJobMock = jest
      .spyOn(jobData, "removeJob")
      .mockResolvedValue({ deletedCount: 1, acknowledged: true });
    mockRequest = {
      params: {
        id: "63785b41294b379c837ecd2b",
      },
      userData: {
        userId: "46785b41244b379c837ecd2b",
      },
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with correct response", async () => {
    const response = await service.deleteJob(mockRequest);
    expect(findOneMock).toBeCalledTimes(1);
    expect(updateApplicationMock).toHaveBeenCalledWith(
      {
        user: "46785b41244b379c837ecd2b",
      },
      {
        $pullAll: {
          jobs: [rawJob._id],
        },
      }
    );
    expect(updateApplicationMock).toBeCalledTimes(1);
    expect(removeJobMock).toBeCalledTimes(1);
    expect(response).toEqual(true);
  });

  it("should throw error if invalid id is passed", async () => {
    mockRequest = {
      params: {
        id: "63785b41294b379c837ecd2",
      },
    };
    await expect(service.deleteJob(mockRequest)).rejects.toThrow(
      "Invalid job id"
    );
  });

  it("should throw error if no job is found for given id", async () => {
    mockRequest = {
      params: {
        id: "63785b41294b379c837ecd2c",
      },
      userData: {
        userId: "46785b41244b379c837ecd2b",
      },
    };
    jest.spyOn(jobData, "findOneJob").mockResolvedValue(null);
    await expect(service.deleteJob(mockRequest)).rejects.toThrow("Invalid job");
  });
});

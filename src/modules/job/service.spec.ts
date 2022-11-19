import service from "./service";
import * as jobData from "./data";
import { ObjectId } from "mongodb";

const dbJobResponse = {
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
const jobResponse = {
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
  const spy = jest
    .spyOn(jobData, "findJobs")
    .mockResolvedValueOnce(dbJobsResponse);

  it("should resolve with true and valid userId for hardcoded token", async () => {
    const response = await service.getJobs(mockRequest);
    expect(spy).toBeCalledTimes(1);
    expect(response).toEqual(jobsResponse);
  });
});
describe("job.service.getJob()", () => {
  const dbJobResponse = {
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
  const jobResponse = {
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
  let mockRequest = {
    params: {
      id: "63785b41294b379c837ecd2b",
    },
  };
  let findOneMock: any;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with correct response", async () => {
    findOneMock = jest
      .spyOn(jobData, "findOneJob")
      .mockResolvedValueOnce(dbJobResponse);
    const response = await service.getJob(mockRequest);
    expect(findOneMock).toBeCalledTimes(1);
    expect(response).toEqual(jobResponse);
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
  const dbJobResponse = {
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
  const jobResponse = {
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

  it("should resolve with correct response", async () => {
    insertJobMock = jest
      .spyOn(jobData, "insertJob")
      .mockResolvedValueOnce(dbJobResponse);
    const response = await service.saveJob(mockRequest);
    expect(insertJobMock).toBeCalledTimes(1);
    expect(response).toEqual(jobResponse);
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

describe("job.service.getJob()", () => {
  const dbJobResponse = {
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
  const jobResponse = {
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
  let mockRequest = {
    params: {
      id: "63785b41294b379c837ecd2b",
    },
  };
  let findOneMock: any;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with correct response", async () => {
    findOneMock = jest
      .spyOn(jobData, "findOneJob")
      .mockResolvedValueOnce(dbJobResponse);
    const response = await service.getJob(mockRequest);
    expect(findOneMock).toBeCalledTimes(1);
    expect(response).toEqual(jobResponse);
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

describe("job.service.deleteJob()", () => {
  let mockRequest:any = {
    params: {
      id: "63785b41294b379c837ecd2b",
    },
    userData: {
      userId: "46785b41244b379c837ecd2b"
    }
  };
  let findOneMock: any;
  let updateApplicationMock: any;
  let removeJobMock: any;
  beforeEach(() => {
    jest.clearAllMocks();
    findOneMock = jest
      .spyOn(jobData, "findOneJob")
      .mockResolvedValueOnce(dbJobResponse);
    updateApplicationMock = jest.spyOn(jobData, "updateApplication").mockResolvedValueOnce({ matchedCount : 1, modifiedCount : 1, acknowledged : true} as any);
    removeJobMock = jest.spyOn(jobData, "removeJob").mockResolvedValueOnce({deletedCount:1, acknowledged:true});
  });

  it("should resolve with correct response", async () => {
    const response = await service.deleteJob(mockRequest);
    expect(findOneMock).toBeCalledTimes(1);
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
    await expect(service.deleteJob(mockRequest)).rejects.toThrow("Invalid job id");
  });

  // it("should throw error if no job is found for given id", async () => {
  //   mockRequest = {
  //     params: {
  //       id: "63785b41294b379c837ecd2c",
  //     },
  //   };
  //   findOneMock = jest.spyOn(jobData, "findOneJob").mockResolvedValue(null);
  //   await expect(service.getJob(mockRequest)).rejects.toThrow("Job not found");
  // });
});

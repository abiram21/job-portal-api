import service from "./service";
import * as jobData from "../job/data";
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

const rawApplication: any = {
  _id: new ObjectId("45643b41294b379c837ecd2b"),
  user: new ObjectId("46785b41244b379c837ecd2b"),
  jobs: [new ObjectId("63785b41294b379c837ecd2b")],
};
const rawApplicationWithJob: any = {
  _id: new ObjectId("45643b41294b379c837ecd2b"),
  user: new ObjectId("46785b41244b379c837ecd2b"),
  jobs: [rawJob],
};

describe("job.service.applyJob()", () => {
  let mockRequest: any;
  let findOneJobMock: any;
  let updateApplicationMock: any;
  let insertApplicationMock: any;
  let findOneApplicationMock: any;
  beforeEach(() => {
    findOneJobMock = jest
      .spyOn(jobData, "findOneJob")
      .mockResolvedValue(rawJob);
    updateApplicationMock = jest
      .spyOn(applicationData, "updateApplication")
      .mockResolvedValue({
        matchedCount: 1,
        modifiedCount: 1,
        acknowledged: true,
      } as any);
    insertApplicationMock = jest
      .spyOn(applicationData, "insertApplication")
      .mockResolvedValue("36785b41294b379c837ecd2b");
    findOneApplicationMock = jest
      .spyOn(applicationData, "findOneApplication")
      .mockResolvedValue(null);
    mockRequest = {
      params: {
        jobId: "63785b41294b379c837ecd2b",
      },
      userData: {
        userId: "46785b41244b379c837ecd2b",
      },
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with inserting a new entry in application", async () => {
    const response = await service.applyJob(mockRequest);
    expect(findOneJobMock).toBeCalledTimes(1);
    expect(findOneApplicationMock).toBeCalledTimes(1);
    expect(updateApplicationMock).toBeCalledTimes(0);
    expect(insertApplicationMock).toBeCalledTimes(1);
    expect(insertApplicationMock).toHaveBeenCalledWith({
      userId: "46785b41244b379c837ecd2b",
      jobs: ["63785b41294b379c837ecd2b"],
    });
    expect(response).toEqual(true);
  });

  it("should resolve with updating the existing entry in application", async () => {
    findOneApplicationMock = jest
      .spyOn(applicationData, "findOneApplication")
      .mockResolvedValue(rawApplication);
    const response = await service.applyJob(mockRequest);
    expect(findOneJobMock).toBeCalledTimes(1);
    expect(findOneApplicationMock).toBeCalledTimes(1);
    expect(updateApplicationMock).toBeCalledTimes(1);
    expect(updateApplicationMock).toHaveBeenCalledWith(
      { user: "46785b41244b379c837ecd2b" },
      {
        $push: {
          jobs: "63785b41294b379c837ecd2b",
        },
      }
    );
    expect(insertApplicationMock).toBeCalledTimes(0);
    expect(response).toEqual(true);
  });

  it("should throw error if invalid id is passed", async () => {
    mockRequest = {
      params: {
        jobId: "63785b41294b379c837ecd2",
      },
    };
    await expect(service.applyJob(mockRequest)).rejects.toThrow(
      "Invalid job id"
    );
  });
});
describe("job.service.getAppliedJobs()", () => {
  let mockRequest = {
    params: {
      jobId: "63785b41294b379c837ecd2b",
    },
    userData: {
      userId: "46785b41244b379c837ecd2b",
    },
  };

  let findApplicationMock: any;

  it("should resolve with applied jobs for the user", async () => {
    findApplicationMock = jest
      .spyOn(applicationData, "findApplications")
      .mockResolvedValueOnce(rawApplicationWithJob);
    const response = await service.getAppliedJobs(mockRequest);
    expect(findApplicationMock).toBeCalledTimes(1);
    expect(response).toEqual([job]);
  });
});

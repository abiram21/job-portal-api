import { RawJob, Job } from "../types";
import config from "../../../config/common";

const convert = (rawJob: RawJob) => {
  const user: Job = {
    id: rawJob._id,
    title: rawJob.title,
    description: rawJob.description,
    active: rawJob.active,
    company: rawJob.company,
    salary: rawJob.salary,
    image: config.baseURL.concat("/", rawJob.image),
  };
  return user;
};

export default convert;

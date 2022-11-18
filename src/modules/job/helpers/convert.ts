import { RawJob, Job } from "../model/type";

const convert = (rawJob: RawJob) => {
  const user: Job = {
    id: rawJob._id,
    title: rawJob.title,
    description: rawJob.description,
    active: rawJob.active,
    company: rawJob.company,
    salary: rawJob.salary,
    image: rawJob.image,

  };
  return user;
};

export default convert;

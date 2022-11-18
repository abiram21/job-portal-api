import { Router } from "express";
import { getJob, getJobs, saveJob, deleteJob } from "./controller";

const router = Router();

router.get("/", getJobs);
// router.get("/:id", controller.getUser);
router.post("/", saveJob);
router.get("/:id", getJob);
// router.put("/:id", controller.updateUser);
router.delete("/:id", deleteJob);

export default router;

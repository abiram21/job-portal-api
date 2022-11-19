import { Router } from "express";
import {
  getJob,
  getJobs,
  saveJob,
  deleteJob,
  applyJob,
  getAppliedJob,
} from "./controller";
import { checkToken, checkAdmin } from "../../middlewares/check-auth";

import multer from "../../middlewares/multer";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", checkToken, checkAdmin, multer, saveJob);
router.post("/:id/apply", checkToken, applyJob);
router.delete("/:id", checkToken, checkAdmin, deleteJob);
router.get("/user/applied", checkToken, getAppliedJob);

export default router;

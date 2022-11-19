import { Router } from "express";
import { getJob, getJobs, saveJob, deleteJob } from "./controller";
import { checkToken, checkAdmin } from "../../middlewares/check-auth";

import multer from "../../middlewares/multer";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", checkToken, checkAdmin, multer, saveJob);
router.delete("/:id", checkToken, checkAdmin, deleteJob);

export default router;

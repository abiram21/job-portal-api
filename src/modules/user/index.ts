import { Router } from "express";
import {
  getUsers,
  login,
  saveUser,
  getUser,
  applyJob,
  getAppliedJobs,
} from "./controller";
import { checkToken, checkAdmin } from "../../middlewares/check-auth";

const router = Router();

router.get("/", checkToken, checkAdmin, getUsers);
router.get("/my-profile", checkToken, getUser);
router.post("/signup", saveUser);
router.post("/login", login);
router.post("/me/apply-job/:jobId", checkToken, applyJob);
router.get("/me/applied-jobs", checkToken, getAppliedJobs);

export default router;

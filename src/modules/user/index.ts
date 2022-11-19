import { Router } from "express";
import { getUsers, login, saveUser, getUser, applyJob, getAppliedJobs } from "./controller";
import { checkToken, checkAdmin } from "../../middlewares/check-auth";

const router = Router();

router.get("/", checkToken, checkAdmin, getUsers);
router.get("/profile", checkToken, getUser);
router.post("/signup", saveUser);
router.post("/login", login);
router.post("/apply/:jobId", checkToken, applyJob);
router.get("/applied-jobs", checkToken, getAppliedJobs);

export default router;

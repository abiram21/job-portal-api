import { Router } from "express";
import { getUsers, saveUser } from "./controller";

const router = Router();

router.get("/", getUsers);
// router.get("/:id", controller.getUser);
router.post("/signup", saveUser);
// router.put("/:id", controller.updateUser);
// router.delete("/:id", controller.deleteUser);

export default router;

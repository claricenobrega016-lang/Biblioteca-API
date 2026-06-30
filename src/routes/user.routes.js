import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { userValidationRules } from "../validators/user.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/permission.middleware.js";

const router = Router();

router.post("/", userValidationRules, UserController.addUser);
router.patch("/:id", authMiddleware, UserController.updateUser);
router.delete("/:id", authMiddleware, UserController.deleteUser);


export default router;
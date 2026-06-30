import { Router } from "express";
import loanController from "../controllers/loan.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/permission.middleware.js";

const router = Router();

router.post("/", authMiddleware, checkRole("admin"), loanController.createLoan);
router.patch("/return/:id/", authMiddleware, checkRole("admin"), loanController.returnBook);


export default router;
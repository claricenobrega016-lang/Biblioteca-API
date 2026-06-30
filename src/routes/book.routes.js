import { Router } from "express";
import BookController from "../controllers/book.controller.js";
import { bookValidationRules } from "../validators/book.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/permission.middleware.js";

const router = Router()

router.post("/", authMiddleware, checkRole('admin'), bookValidationRules , BookController.addBook);
router.patch("/:id", authMiddleware, checkRole('admin'), BookController.updateBook);
router.delete("/:id", authMiddleware, checkRole('admin'), BookController.deleteBook);

export default router
import { Router } from "express";
import { SubjectController } from "../controllers/SubjectController";
import { GradeController } from "../controllers/GradeController";
import { UnitController } from "../controllers/UnitController";
import { LessonController } from "../controllers/LessonController";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

const subjectController = new SubjectController();
const gradeController = new GradeController();
const unitController = new UnitController();
const lessonController = new LessonController();
const authController = new AuthController();

// Autenticação
routes.post("/register", authController.register);
routes.post("/login", authController.login);

// Matérias
routes.post("/subjects", authMiddleware, subjectController.create);
routes.get("/subjects", subjectController.list);
routes.put("/subjects/:id", authMiddleware, subjectController.update);
routes.delete("/subjects/:id", authMiddleware, subjectController.delete);

// Séries
routes.post(
    "/subjects/:subjectId/grades",
    authMiddleware,
    gradeController.create,
);
routes.get("/grades", gradeController.list);
routes.put("/grades/:id", authMiddleware, gradeController.update);
routes.delete("/grades/:id", authMiddleware, gradeController.delete);

// Unidades
routes.post("/grades/:gradeId/units", authMiddleware, unitController.create);
routes.get("/units", unitController.list);
routes.put("/units/:id", authMiddleware, unitController.update);
routes.delete("/units/:id", authMiddleware, unitController.delete);

// Aulas
routes.post("/units/:unitId/lessons", authMiddleware, lessonController.create);
routes.get("/lessons", lessonController.list);
routes.put("/lessons/:id", authMiddleware, lessonController.update);
routes.delete("/lessons/:id", authMiddleware, lessonController.delete);

export { routes };

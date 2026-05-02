import { Router } from "express";
import { SubjectController } from "../controllers/SubjectController";
import { GradeController } from "../controllers/GradeController";
import { UnitController } from "../controllers/UnitController";
import { LessonController } from "../controllers/LessonController";

const routes = Router();

const subjectController = new SubjectController();
const gradeController = new GradeController();
const unitController = new UnitController();
const lessonController = new LessonController();

// Matérias
routes.post("/subjects", subjectController.create);
routes.get("/subjects", subjectController.list);

// Séries
routes.post("/subjects/:subjectId/grades", gradeController.create);
routes.get("/grades", gradeController.list);

// Unidades
routes.post("/grades/:gradeId/units", unitController.create);
routes.get("/units", unitController.list);

// Aulas
routes.post("/units/:unitId/lessons", lessonController.create);
routes.get("/lessons", lessonController.list);

export { routes };
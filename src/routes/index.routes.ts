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
routes.put("/subjects/:id", subjectController.update);
routes.delete("/subjects/:id", subjectController.delete); 

// Séries
routes.post("/subjects/:subjectId/grades", gradeController.create);
routes.get("/grades", gradeController.list);
routes.put("/grades/:id", gradeController.update);
routes.delete("/grades/:id", gradeController.delete); 

// Unidades
routes.post("/grades/:gradeId/units", unitController.create);
routes.get("/units", unitController.list);
routes.put("/units/:id", unitController.update);
routes.delete("/units/:id", unitController.delete);

// Aulas
routes.post("/units/:unitId/lessons", lessonController.create);
routes.get("/lessons", lessonController.list);
routes.put("/lessons/:id", lessonController.update);
routes.delete("/lessons/:id", lessonController.delete);

export { routes };
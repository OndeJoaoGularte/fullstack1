import { Router } from "express";
import { SubjectController } from "../controllers/SubjectController";
import { GradeController } from "../controllers/GradeController";

const routes = Router();

const subjectController = new SubjectController();
const gradeController = new GradeController();

routes.post("/subjects", subjectController.create);
routes.get("/subjects", subjectController.list);

routes.post("/subjects/:subjectId/grades", gradeController.create);
routes.get("/grades", gradeController.list);

export { routes };
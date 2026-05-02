import { Request, Response } from "express";
import { LessonService } from "../services/LessonService";

export class LessonController {
  // criação de uma nova aula utilizando o service que criamos anteriormente
  async create(req: Request, res: Response) {
    try {
      const unitId = req.params.unitId as string;
      const service = new LessonService();

      const lesson = await service.createLessonForUnit(unitId, req.body);
      return res.status(201).json(lesson);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // lista as aulas utilizando o service que criamos anteriormente
  async list(req: Request, res: Response) {
    const service = new LessonService();
    const lessons = await service.list();
    return res.status(200).json(lessons);
  }

  // atualiza os dados de uma aula específica utilizando o service que criamos anteriormente
  // PUT
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const service = new LessonService();

      const updatedLesson = await service.update(id, req.body);

      return res.status(200).json(updatedLesson);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // deleta uma aula específica utilizando o service que criamos anteriormente
  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const service = new LessonService();

      await service.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

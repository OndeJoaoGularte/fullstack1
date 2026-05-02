import { Request, Response } from "express";
import { GradeService } from "../services/GradeService";

export class GradeController {
  // criação de uma nova série utilizando o service que criamos anteriormente
  async create(req: Request, res: Response) {
    try {
      const subjectId = req.params.subjectId as string;
      const service = new GradeService();
      const grade = await service.createGradeForSubject(subjectId, req.body);

      return res.status(201).json(grade);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // lista as séries utilizando o service que criamos anteriormente
  async list(req: Request, res: Response) {
    const service = new GradeService();
    const grades = await service.list();

    return res.status(200).json(grades);
  }

  // atualiza os dados de uma série específica utilizando o service que criamos anteriormente
  // PUT
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const service = new GradeService();

      const updatedGrade = await service.update(id, req.body);

      return res.status(200).json(updatedGrade);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // deleta uma série específica utilizando o service que criamos anteriormente
  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const service = new GradeService();

      await service.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

import { Request, Response } from "express";
import { SubjectService } from "../services/SubjectService";

export class SubjectController {
  // criação de uma nova matéria utilizando o service que criamos anteriormente
  async create(req: Request, res: Response) {
    try {
      const service = new SubjectService();
      const subject = await service.create(req.body);

      return res.status(201).json(subject);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar matéria." });
    }
  }

  // lista a matéria utilizando o service que criamos anteriormente
  async list(req: Request, res: Response) {
    const service = new SubjectService();
    const subjects = await service.list();

    return res.status(200).json(subjects);
  }
}

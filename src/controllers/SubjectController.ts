import { Request, Response } from "express";
import { SubjectService } from "../services/SubjectService";

export class SubjectController {
  // criação de uma nova matéria utilizando o service que criamos anteriormente
  // POST
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
  // GET
  async list(req: Request, res: Response) {
    const service = new SubjectService();
    const subjects = await service.list();

    return res.status(200).json(subjects);
  }

  // atualiza os dados de uma matéria específica utilizando o service que criamos anteriormente
  // PUT
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const service = new SubjectService();

      const updatedSubject = await service.update(id, req.body);

      return res.status(200).json(updatedSubject);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // deleta uma matéria específica utilizando o service que criamos anteriormente
  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const service = new SubjectService();

      await service.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

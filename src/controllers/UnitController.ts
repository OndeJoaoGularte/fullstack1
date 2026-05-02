import { Request, Response } from "express";
import { UnitService } from "../services/UnitService";

export class UnitController {
  // criação de uma nova unidade utilizando o service que criamos anteriormente
  async create(req: Request, res: Response) {
    try {
      const gradeId = req.params.gradeId as string;
      const service = new UnitService();

      const unit = await service.createUnitForGrade(gradeId, req.body);
      return res.status(201).json(unit);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // lista as unidades utilizando o service que criamos anteriormente
  async list(req: Request, res: Response) {
    const service = new UnitService();
    const units = await service.list();
    return res.status(200).json(units);
  }
}

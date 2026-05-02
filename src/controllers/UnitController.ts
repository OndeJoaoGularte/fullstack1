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
  
    // atualiza os dados de uma unidade específica utilizando o service que criamos anteriormente
    // PUT
    async update(req: Request, res: Response) {
      try {
        const id = req.params.id as string;
        const service = new UnitService();
  
        const updatedUnit = await service.update(id, req.body);
  
        return res.status(200).json(updatedUnit);
      } catch (error: any) {
        return res.status(404).json({ error: error.message });
      }
    }
  
    // deleta uma unidade específica utilizando o service que criamos anteriormente
    // DELETE
    async delete(req: Request, res: Response) {
      try {
        const id = req.params.id as string;
        const service = new UnitService();
  
        await service.delete(id);
  
        return res.status(204).send();
      } catch (error: any) {
        return res.status(404).json({ error: error.message });
      }
    }
}

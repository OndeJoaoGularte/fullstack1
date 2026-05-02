import { AppDataSource } from "../data-source";
import { Unit } from "../entities/Unit";
import { Grade } from "../entities/Grade";

export class UnitService {
  private unitRepository = AppDataSource.getRepository(Unit);
  private gradeRepository = AppDataSource.getRepository(Grade);

  // criação de uma nova unidade já atrelada a uma série, o "Partial<Unit>" é usado para informar que o novo objeto vai conter apenas algumas propriedades do Unit
  async createUnitForGrade(gradeId: string, data: Partial<Unit>) {
    // verifica se o ID fornecido existe
    const grade = await this.gradeRepository.findOneBy({ id: gradeId });

    if (!grade) throw new Error("Série não encontrada.");

    // criação da nova unidade, já esperando que o TypeORM crie a foreign key
    const unit = this.unitRepository.create({
      ...data,
      grade: grade,
    });

    await this.unitRepository.save(unit);

    return unit;
  }

  // lista as unidades atreladas a série que ela pertence
  async list() {
    return await this.unitRepository.find({ relations: ["grade", "lessons"] });
  }
}

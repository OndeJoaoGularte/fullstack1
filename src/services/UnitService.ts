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
        return await this.unitRepository.find({
            relations: ["grade", "lessons"],
        });
    }

    // atualiza os dados de uma unidade específica utilizando o ID
    async update(id: string, data: Partial<Unit>) {
        const unit = await this.unitRepository.findOneBy({ id });
        if (!unit) throw new Error("Unidade não encontrada.");

        this.unitRepository.merge(unit, data);
        await this.unitRepository.save(unit);
        return unit;
    }

    // deleta uma unidade específica utilizando o ID
    async delete(id: string) {
        const unit = await this.unitRepository.findOneBy({ id });
        if (!unit) throw new Error("Unidade não encontrada.");

        await this.unitRepository.remove(unit);
    }
}

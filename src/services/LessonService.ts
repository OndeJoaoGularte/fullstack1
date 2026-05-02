import { AppDataSource } from "../data-source";
import { Lesson } from "../entities/Lesson";
import { Unit } from "../entities/Unit";

export class LessonService {
  private lessonRepository = AppDataSource.getRepository(Lesson);
  private unitRepository = AppDataSource.getRepository(Unit);

  // criação de uma nova aula já atrelada a uma unidade, o "Partial<Lesson>" é usado para informar que o novo objeto vai conter apenas algumas propriedades do Lesson
  async createLessonForUnit(unitId: string, data: Partial<Lesson>) {
    // verifica se o ID fornecido existe
    const unit = await this.unitRepository.findOneBy({ id: unitId });
    if (!unit) throw new Error("Unidade não encontrada.");

    // criação da nova aula, já esperando que o TypeORM crie a foreign key
    const lesson = this.lessonRepository.create({
      ...data,
      unit: unit,
    });

    await this.lessonRepository.save(lesson);
    return lesson;
  }

  // lista as aulas atreladas a unidade que ela pertence
  async list() {
    return await this.lessonRepository.find({ relations: ["unit"] });
  }
  
    // atualiza os dados de uma aula específica utilizando o ID
    async update(id: string, data: Partial<Lesson>) {
      const lesson = await this.lessonRepository.findOneBy({ id });
      if (!lesson) throw new Error("Aula não encontrada.");
  
      this.lessonRepository.merge(lesson, data);
      await this.lessonRepository.save(lesson);
      return lesson;
    }
  
    // deleta uma aula específica utilizando o ID
    async delete(id: string) {
      const lesson = await this.lessonRepository.findOneBy({ id });
      if (!lesson) throw new Error("Aula não encontrada.");
  
      await this.lessonRepository.remove(lesson);
    }
}

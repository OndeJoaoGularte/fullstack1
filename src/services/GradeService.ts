import { AppDataSource } from "../data-source";
import { Grade } from "../entities/Grade";
import { Subject } from "../entities/Subject";

export class GradeService {
  private gradeRepository = AppDataSource.getRepository(Grade);
  private subjectRepository = AppDataSource.getRepository(Subject);

  // criação de uma nova série já atrelada a uma matéria, o "Partial<Grade>" é usado para informar que o novo objeto vai conter apenas algumas propriedades do Grade
  async createGradeForSubject(subjectId: string, data: Partial<Grade>) {
    
    // verifica se o ID fornecido existe
    const subject = await this.subjectRepository.findOneBy({ id: subjectId });
    
    if (!subject) {
      throw new Error("Matéria não encontrada."); 
    }

    // criação da nova série, já esperando que o TypeORM crie a foreign key
    const grade = this.gradeRepository.create({
      ...data,
      subject: subject
    });

    await this.gradeRepository.save(grade);

    return grade;
  }

  // lista as séries atreladas a matéria que ela pertence
  async list() {
    return await this.gradeRepository.find({
      relations: ["subject", "units"]
    });
  }
}
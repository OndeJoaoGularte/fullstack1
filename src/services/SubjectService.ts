import { AppDataSource } from "../data-source";
import { Subject } from "../entities/Subject";

export class SubjectService {
  private subjectRepository = AppDataSource.getRepository(Subject);

  // criação de uma nova matéria, o "Partial<Subject>" é usado para informar que o novo objeto vai conter apenas algumas propriedades do Subject
  async create(data: Partial<Subject>) {
    const subject = this.subjectRepository.create(data);
    
    await this.subjectRepository.save(subject);
    
    return subject;
  }

  // lista a matéria atrelada as séries em que ela está inserida (por exemplo: redação não estaria presente nos primeiros anos do funtamental)
  async list() {
    return await this.subjectRepository.find({
      relations: ["grades"]
    });
  }

  // busca uma matéria específica utilizando o ID, trazendo junto as séries atreladas
  async findById(id: string) {
    return await this.subjectRepository.findOne({ 
      where: { id },
      relations: ["grades"]
    });
  }
}
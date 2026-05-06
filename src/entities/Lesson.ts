import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Unit } from "./Unit";

@Entity("lessons")
export class Lesson {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // ordem das aulas dentro de uma unidade
    @Column({ type: "int", default: 1 })
    orderIndex: number;

    @Column()
    title: string;

    @Column("text")
    mainContent: string;

    @Column("text", { nullable: true })
    historicalContext: string;

    @Column({ type: "float", default: 0 })
    averageRating: number;

    // várias aulas compõem uma unidade
    @ManyToOne(() => Unit, (unit) => unit.lessons, { onDelete: "CASCADE" })
    unit: Unit;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

//import { Exercise } from "./Exercise";             exercícios para fixar o conteúdo, complementando o conteúdo em texto
//import { Video } from "./Video";                   além do conteúdo em texto, haverão vídeos explicativos para complementar
//import { StudyResource } from "./StudyResource";   materiais para complementar as aulas, como artigos, livros, sites...
//import { Quiz } from "./Quiz";                     quiz após as aulas para fixar o conteúdo
//import { LessonFeedback } from "./LessonFeedback"; feedbacks das aulas, com avaliação e comentários

//@OneToMany(() => Exercise, (exercise) => exercise.lesson, { cascade: true })
//exercises: Exercise[];

//@OneToMany(() => Video, (video) => video.lesson, { cascade: true })
//videos: Video[];

//@OneToMany(() => StudyResource, (resource) => resource.lesson, { cascade: true })
//studyResources: StudyResource[];

//@OneToMany(() => LessonFeedback, (feedback) => feedback.lesson)
//feedbacks: LessonFeedback[];

//@OneToOne(() => Quiz, (quiz) => quiz.lesson, { cascade: true })
//quiz: Quiz;

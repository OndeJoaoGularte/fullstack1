import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { QuizBlock } from "./ContentBlock";

@Entity("quiz_questions")
export class QuizQuestion {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => QuizBlock, (quizBlock) => quizBlock.questions, {
        onDelete: "CASCADE",
    })
    quizBlock: QuizBlock;

    @Column({ type: "text" })
    questionText: string;

    @Column({ type: "simple-array" })
    options: string[];

    @Column({ type: "int" })
    correctOptionIndex: number;

    @Column({ type: "text" })
    solutionGuide: string;
}

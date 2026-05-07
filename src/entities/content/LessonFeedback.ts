import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { Lesson } from "./Lesson";

@Entity("lesson_feedbacks")
export class LessonFeedback {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    userId: string;

    @ManyToOne(() => Lesson, (lesson) => lesson.feedbacks, {
        onDelete: "CASCADE",
    })
    lesson: Lesson;

    @Column({ type: "int" })
    rating: number;

    @Column({ type: "text" })
    comment: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}

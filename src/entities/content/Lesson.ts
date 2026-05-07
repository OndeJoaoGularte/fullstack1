import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Unit } from "./Unit";
import { ContentBlock } from "./ContentBlock";
import { LessonFeedback } from "./LessonFeedback";

@Entity("lessons")
export class Lesson {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "int" })
    orderIndex: number;

    @Column({ type: "float", default: 0 })
    averageRating: number;

    @OneToMany(() => ContentBlock, (block) => block.lesson)
    contentBlocks: ContentBlock[];

    @OneToMany(() => LessonFeedback, (feedback) => feedback.lesson)
    feedbacks: LessonFeedback[];

    @ManyToOne(() => Unit, (unit) => unit.lessons, { onDelete: "CASCADE" })
    unit: Unit;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}

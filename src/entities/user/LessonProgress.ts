import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Lesson } from "../content/Lesson";

export enum ProgressStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

@Entity("lesson_progresses")
export class LessonProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  userId: string;

  @Column({ type: "text" })
  lessonId: string;

  @ManyToOne(() => User, (user) => user.progresses, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Lesson, { onDelete: "CASCADE" })
  lesson: Lesson;

  @Column({ type: "int", default: 0 })
  lastBlockIndex: number;

  @Column({
    type: "enum",
    enum: ProgressStatus,
    default: ProgressStatus.NOT_STARTED,
  })
  status: ProgressStatus;

  @Column({ type: "timestamp", nullable: true })
  completedAt: Date;
}

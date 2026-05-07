import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Grade } from "./Grade";
import { Lesson } from "./Lesson";

@Entity("units")
export class Unit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int", default: 0 })
  orderIndex: number;

  @Column({ type: "text" })
  gradeId: string;

  @ManyToOne(() => Grade, (grade) => grade.units, { onDelete: "CASCADE" })
  grade: Grade;

  @OneToMany(() => Lesson, (lesson) => lesson.unit, { cascade: true })
  lessons: Lesson[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

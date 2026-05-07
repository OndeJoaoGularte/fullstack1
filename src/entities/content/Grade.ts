import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Subject } from "./Subject";
import { Unit } from "./Unit";

export enum Stage {
  HIGH_SCHOOL = "Ensino Médio",
  ELEMENTARY_1 = "Ensino Fundamental 1",
  ELEMENTARY_2 = "Ensino Fundamental 2",
}

@Entity("grades")
export class Grade {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int", default: 0 })
  level: number;

  @Column({
    type: "enum",
    enum: Stage,
    default: Stage.HIGH_SCHOOL,
  })
  stage: Stage;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "int", default: 0 })
  orderIndex: number;

  @Column({ type: "text" })
  subjectId: string;

  @ManyToOne(() => Subject, (subject) => subject.grades, {
    onDelete: "CASCADE",
  })
  subject: Subject;

  @OneToMany(() => Unit, (unit) => unit.grade, { cascade: true })
  units: Unit[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

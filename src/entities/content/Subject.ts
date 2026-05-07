import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Grade } from "./Grade";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  shortDescription: string;

  @Column({ type: "text", nullable: true })
  longDescription: string;

  @OneToMany(() => Grade, (grade) => grade.subject, { cascade: true })
  grades: Grade[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

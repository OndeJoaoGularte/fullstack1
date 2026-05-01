import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Grade } from "./Grade";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  shortDescription: string;

  @Column({ type: "text" })
  longDescription: string;

  // a mesma matéria pode estar inserida em mais de uma série
  @OneToMany(() => Grade, (grade) => grade.subject, { cascade: true })
  grades: Grade[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Subject } from "./Subject";
import { Unit } from "./Unit";

@Entity("grades")
export class Grade {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "int" })
    level: number;

    @Column({ type: "enum", enum: ['Ensino Médio', 'Ensino Fundamental 1', 'Ensino Fundamental 2'] })
    stage: string;

    @Column()
    name: string;

    // mais de uma série pode ter a mesma matéria
    @ManyToOne(() => Subject, (subject) => subject.grades, { onDelete: "CASCADE" })
    subject: Subject;

    // uma série é composta por várias unidades
    @OneToMany(() => Unit, (unit) => unit.grade, { cascade: true })
    units: Unit[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
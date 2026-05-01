import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Grade } from "./Grade";
import { Lesson } from "./Lesson";

@Entity("units")
export class Unit {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // ordem das unidades dentro de uma série
    @Column({ type: "int", default: 1 })
    orderIndex: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    // várias unidades compõem uma série
    @ManyToOne(() => Grade, (grade) => grade.units, { onDelete: "CASCADE" })
    grade: Grade;

    // uma unidade é composta por várias aulas
    @OneToMany(() => Lesson, (lesson) => lesson.unit, { cascade: true })
    lessons: Lesson[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
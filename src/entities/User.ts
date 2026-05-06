import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Subject } from "./Subject";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // um usuário pode estar matriculado em várias matérias, e uma matéria pode ter vários usuários matriculados
    @ManyToMany(() => Subject)
    // tabela intermediária para relacionar usuários e matérias
    @JoinTable({
        name: "users_subjects",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "subject_id", referencedColumnName: "id" },
    })
    enrolledSubjects: Subject[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

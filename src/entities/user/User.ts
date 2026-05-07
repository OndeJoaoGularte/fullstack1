import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Subject } from "../content/Subject";
import { UserEnrollmentSubject } from "./UserEnrollmentSubject";
import { LessonProgress } from "./LessonProgress";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text", nullable: true })
  avatarUrl: string;

  @Column({ type: "text", nullable: true })
  mainSubjectId: string;

  @ManyToOne(() => Subject, { nullable: true, onDelete: "SET NULL" })
  mainSubject: Subject;

  @OneToMany(() => UserEnrollmentSubject, (enrollment) => enrollment.user)
  enrollmentSubjects: UserEnrollmentSubject[];

  @OneToMany(() => LessonProgress, (progress) => progress.user)
  progresses: LessonProgress[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Subject } from "../content/Subject";

@Entity("user_enrollment_subjects")
export class UserEnrollmentSubject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  userId: string;

  @Column({ type: "text" })
  subjectId: string;

  @ManyToOne(() => User, (user) => user.enrollmentSubjects, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Subject, { onDelete: "CASCADE" })
  subject: Subject;

  @CreateDateColumn({ type: "timestamp" })
  addedAt: Date;
}

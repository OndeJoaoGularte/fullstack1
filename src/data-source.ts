import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Subject } from "./entities/Subject";
import { Grade } from "./entities/Grade";
import { Unit } from "./entities/Unit";
import { Lesson } from "./entities/Lesson";
import { User } from "./entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Subject, Grade, Unit, Lesson, User],
    migrations: [],
    subscribers: [],
});

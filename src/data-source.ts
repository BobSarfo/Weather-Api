import "reflect-metadata"
import { DataSource } from "typeorm"
import { Incident } from "./entity/Incident"
import { User } from "./entity/User"

export const dbContext = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD ||"postgres",
    database: "weather",
    synchronize: true,
    logging: false,
    entities: [User,Incident],
    migrations: [],
    subscribers: [],
})

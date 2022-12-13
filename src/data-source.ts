import "reflect-metadata"
import { DataSource } from "typeorm"
import { Incident } from "./entity/Incidents"
import { User } from "./entity/User"

export const dbContext = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "weather",
    synchronize: true,
    logging: false,
    entities: [User,Incident],
    migrations: [],
    subscribers: [],
})

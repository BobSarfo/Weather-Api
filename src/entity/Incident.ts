import { cp } from "fs"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Incident {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    client_id: number

    @Column()
    incident_desc: string

    @Column()
    city: string


    @CreateDateColumn()
    date: Date;

    @Column()
    country: string

    @Column('jsonb', { nullable: true })
    weather_report?: object;
}
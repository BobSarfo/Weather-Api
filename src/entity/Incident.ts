import { cp } from "fs"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

    @Column()
    country: string

    @Column('jsonb', { nullable: true })
    weather_report?: object;
}
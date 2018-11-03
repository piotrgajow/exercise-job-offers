import { LocalDateTime } from 'js-joda';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    creationDate: string;

}
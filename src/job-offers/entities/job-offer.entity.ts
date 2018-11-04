import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { JobCategory } from './job-category';

@Entity()
export class JobOffer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('varchar')
    category: JobCategory;

    @Column('date')
    dateFrom: string;

    @Column('date')
    dateTo: string;

    @Column()
    companyName: string;

}

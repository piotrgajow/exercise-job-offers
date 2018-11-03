import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { JobCategory } from './job-category';

@Entity()
export class JobOffer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: JobCategory;

    @Column()
    dateFrom: string;

    @Column()
    dateTo: string;

    @Column()
    companyName: string;

}

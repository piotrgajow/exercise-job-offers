import { FindConditions } from 'typeorm';
import { JobOffer } from './job-offers/entities/job-offer.entity';

export interface Specification<T> {

    test(subject: T): boolean;

    addToCriteria(criteria: FindConditions<JobOffer>): void;

}

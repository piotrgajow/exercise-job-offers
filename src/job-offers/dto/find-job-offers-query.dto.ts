import { JobCategory } from '../entities/job-category';

export class FindJobOffersQuery {
    category: Array<JobCategory> | JobCategory;
    companyName: string;
}

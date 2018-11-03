import { JobCategory } from '../entities/job-category';

export class CreateJobOfferCommand {
    title: string;
    category: JobCategory;
    dateFrom: string;
    dateTo: string;
    companyName: string;
}

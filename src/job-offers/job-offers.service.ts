import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindConditions, In, MoreThan, Repository } from 'typeorm';

import { CreateJobOfferCommand } from './dto/create-job-offer-command.dto';
import { JobOffer } from './entities/job-offer.entity';
import { FindJobOffersQuery } from './dto/find-job-offers-query.dto';
import { LocalDate } from 'js-joda';

@Injectable()
export class JobOffersService {

    constructor(
        @InjectRepository(JobOffer)
        private readonly jobOfferRepository: Repository<JobOffer>,
    ) {
    }

    async createJobOffer(command: CreateJobOfferCommand): Promise<JobOffer> {
        const jobOffer = command as JobOffer;

        return await this.jobOfferRepository.save(jobOffer);
    }

    async findJobOffers(query: FindJobOffersQuery): Promise<Array<JobOffer>> {
        const criteria = {
            dateTo: MoreThan(LocalDate.now().toString()),
        } as FindConditions<JobOffer>;

        if (query.companyName) {
            criteria.companyName = query.companyName;
        }

        if (query.category) {
            if (Array.isArray(query.category)) {
                criteria.category = In(query.category);
            } else {
                criteria.category = query.category;
            }
        }

        return await this.jobOfferRepository.find(criteria);
    }

}

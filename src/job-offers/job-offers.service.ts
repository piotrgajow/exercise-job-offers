import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateJobOfferCommand } from './dto/create-job-offer-command.dto';
import { JobOffer } from './entities/job-offer.entity';

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

}

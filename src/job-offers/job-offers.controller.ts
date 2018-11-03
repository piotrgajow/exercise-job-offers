import { Body, Controller, Post } from '@nestjs/common';

import { CreateJobOfferCommand } from './dto/create-job-offer-command.dto';
import { JobOffer } from './entities/job-offer.entity';
import { JobOffersService } from './job-offers.service';

@Controller('job-offers')
export class JobOffersController {

    constructor(
        private readonly jobOffersService: JobOffersService,
    ) {
    }

    @Post('/')
    async createJobOffer(@Body() command: CreateJobOfferCommand): Promise<JobOffer> {
        return await this.jobOffersService.createJobOffer(command);
    }

}

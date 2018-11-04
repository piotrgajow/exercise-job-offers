import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateJobOfferCommand } from './dto/create-job-offer-command.dto';
import { JobOffer } from './entities/job-offer.entity';
import { JobOffersService } from './job-offers.service';
import { FindJobOffersQuery } from './dto/find-job-offers-query.dto';

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

    @Get('/')
    async findJobOffers(@Query() query: FindJobOffersQuery): Promise<Array<JobOffer>> {
        return await this.jobOffersService.findJobOffers(query);
    }

}

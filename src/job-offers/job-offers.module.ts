import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobOffersController } from './job-offers.controller';
import { JobOffer } from './entities/job-offer.entity';
import { JobOffersService } from './job-offers.service';

@Module({
    controllers: [
        JobOffersController,
    ],
    imports: [
        TypeOrmModule.forFeature([JobOffer]),
    ],
    providers: [
        JobOffersService,
    ],
})
export class JobOffersModule {
}

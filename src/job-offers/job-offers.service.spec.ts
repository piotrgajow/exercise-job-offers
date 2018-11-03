import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LocalDate } from 'js-joda';

import { JobOffersService } from './job-offers.service';
import { CreateJobOfferCommand } from './dto/create-job-offer-command.dto';
import { JobCategory } from './entities/job-category';
import { JobOffer } from './entities/job-offer.entity';
import { mockRepository } from '../shared/test-utils';

describe('JobOffersService', () => {
    let service: JobOffersService;
    const jobOfferRepositoryMock = mockRepository(JobOffer);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JobOffersService,
                { provide: getRepositoryToken(JobOffer), useValue: jobOfferRepositoryMock },
            ],
        }).compile();
        service = module.get<JobOffersService>(JobOffersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createJobOffer', () => {

        const command = {
            title: 'test',
            category: JobCategory.SHOP_ASSISTANT,
            dateFrom: LocalDate.now().toString(),
            dateTo: LocalDate.now().plusDays(7).toString(),
            companyName: 'test',
        } as CreateJobOfferCommand;

        it('should persist job offer in database', async () => {
            const result = await service.createJobOffer(command);

            expect(jobOfferRepositoryMock.save).toHaveBeenCalled();
            expect(result.id).toBeDefined();
            //expect(result.login).toEqual(command.login);
            //expect(result.password).toEqual(command.password);
            //expect(result.creationDate).toBeDefined();
        });

    });

});

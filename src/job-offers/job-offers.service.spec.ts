import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LocalDate } from 'js-joda';

import { JobOffersService } from './job-offers.service';
import { CreateJobOfferCommand } from './dto/create-job-offer-command.dto';
import { JobCategory } from './entities/job-category';
import { JobOffer } from './entities/job-offer.entity';
import { mockRepository } from '../shared/test-utils';
import { FindJobOffersQuery } from './dto/find-job-offers-query.dto';
import { In, MoreThan } from 'typeorm';

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
        });

    });

    describe('findJobOffers', () => {

        it('should return all valid job offers', async () => {
            const query = {
                category: undefined,
                companyName: undefined,
            } as FindJobOffersQuery;
            const findParams = {
                dateTo: MoreThan(LocalDate.now().toString()),
            };

            await service.findJobOffers(query);

            expect(jobOfferRepositoryMock.find).toHaveBeenCalledWith(findParams);
        });

        it('should return valid job offers by company name', async () => {
            const query = {
                category: undefined,
                companyName: 'test',
            } as FindJobOffersQuery;
            const findParams = {
                dateTo: MoreThan(LocalDate.now().toString()),
                companyName: query.companyName,
            };

            await service.findJobOffers(query);

            expect(jobOfferRepositoryMock.find).toHaveBeenCalledWith(findParams);
        });

        it('should return valid job offers by category', async () => {
            const query = {
                category: JobCategory.IT,
                companyName: undefined,
            } as FindJobOffersQuery;
            const findParams = {
                dateTo: MoreThan(LocalDate.now().toString()),
                category: query.category,
            };

            await service.findJobOffers(query);

            expect(jobOfferRepositoryMock.find).toHaveBeenCalledWith(findParams);
        });

        it('should return valid job offers by category multiple categories', async () => {
            const query = {
                category: [JobCategory.IT, JobCategory.COURIER],
                companyName: undefined,
            } as FindJobOffersQuery;
            const findParams = {
                dateTo: MoreThan(LocalDate.now().toString()),
                category: In(query.category as Array<JobCategory>),
            };

            await service.findJobOffers(query);

            expect(jobOfferRepositoryMock.find).toHaveBeenCalledWith(findParams);
        });

    });

});

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';
import { LocalDate } from 'js-joda';

import { AppModule } from '../src/app.module';
import { JobCategory } from '../src/job-offers/entities/job-category';
import { CreateJobOfferCommand } from '../src/job-offers/dto/create-job-offer-command.dto';
import { executeSql } from './e2e-test-utils';

describe('JobOffersController (e2e)', () => {
    let app: INestApplication;

    const testJobOffer = {
        title: 'Test job offer',
        category: JobCategory.SHOP_ASSISTANT,
        dateFrom: LocalDate.of(2018, 11, 2).toString(),
        dateTo: LocalDate.of(2018, 11, 9).toString(),
        companyName: 'test company',
    } as CreateJobOfferCommand;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        await executeSql('TRUNCATE TABLE job_offer');
    });

    it('create job offer', () => {
        return request(app.getHttpServer())
            .post('/job-offers')
            .send(testJobOffer)
            .expect(201)
            .expect((res) => {
                const result = res.body;
                expect(result.id).toBeDefined();
                expect(result.title).toEqual(testJobOffer.title);
                expect(result.category).toEqual(testJobOffer.category);
                expect(result.dateFrom).toEqual(testJobOffer.dateFrom);
                expect(result.dateTo).toEqual(testJobOffer.dateTo);
                expect(result.companyName).toEqual(testJobOffer.companyName);
            });
    });

    afterAll(() => {
        app.close();
    });

});

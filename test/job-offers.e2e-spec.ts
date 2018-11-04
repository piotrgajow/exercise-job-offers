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


    describe('searching job offers', () => {

        beforeAll(async () => {
            const twoWeeksAgo = LocalDate.now().minusDays(14).toString();
            const weekAgo = LocalDate.now().minusDays(7).toString();
            const inAWeek = LocalDate.now().plusDays(7).toString();
            await executeSql(`INSERT INTO job_offer VALUES (NULL, 'Old offer', 'IT', '${twoWeeksAgo}', '${weekAgo}', 'Company1')`);
            await executeSql(`INSERT INTO job_offer VALUES (NULL, 'Offer 1', 'IT', '${weekAgo}', '${inAWeek}', 'Company1')`);
            await executeSql(`INSERT INTO job_offer VALUES (NULL, 'Offer 2', 'IT', '${weekAgo}', '${inAWeek}', 'Company1')`);
            await executeSql(`INSERT INTO job_offer VALUES (NULL, 'Offer 3', 'Office', '${weekAgo}', '${inAWeek}', 'Company2')`);
            await executeSql(`INSERT INTO job_offer VALUES (NULL, 'Offer 4', 'Courier', '${weekAgo}', '${inAWeek}', 'Company2')`);
            await executeSql(`INSERT INTO job_offer VALUES (NULL, 'Offer 5', 'Courier', '${weekAgo}', '${inAWeek}', 'Company2')`);
        });

        it('should allow searching all valid job offers', async () => {
            return request(app.getHttpServer())
                .get('/job-offers')
                .expect(200)
                .expect((res) => {
                    const result = res.body;
                    expect(result).toBeInstanceOf(Array);
                    expect(result.length).toEqual(6);
                    const foundOfferNames = result.map((it) => it.title);
                    expect(foundOfferNames).toContain('Offer 1');
                    expect(foundOfferNames).toContain('Offer 2');
                    expect(foundOfferNames).toContain('Offer 3');
                    expect(foundOfferNames).toContain('Offer 4');
                    expect(foundOfferNames).toContain('Offer 5');
                    expect(foundOfferNames).toContain(testJobOffer.title);
                });
        });

        it('should allow searching job offers by company name', async () => {
            return request(app.getHttpServer())
                .get('/job-offers?companyName=Company1')
                .expect(200)
                .expect((res) => {
                    const result = res.body;
                    expect(result).toBeInstanceOf(Array);
                    expect(result.length).toEqual(2);
                    const foundOfferNames = result.map((it) => it.title);
                    expect(foundOfferNames).toContain('Offer 1');
                    expect(foundOfferNames).toContain('Offer 2');
                });
        });

        it('should allow searching job offers by category', async () => {
            return request(app.getHttpServer())
                .get('/job-offers?category=IT&category=Office')
                .expect(200)
                .expect((res) => {
                    const result = res.body;
                    expect(result).toBeInstanceOf(Array);
                    expect(result.length).toEqual(3);
                    const foundOfferNames = result.map((it) => it.title);
                    expect(foundOfferNames).toContain('Offer 1');
                    expect(foundOfferNames).toContain('Offer 2');
                    expect(foundOfferNames).toContain('Offer 3');
                });
        });

    });

    afterAll(() => {
        app.close();
    });

});

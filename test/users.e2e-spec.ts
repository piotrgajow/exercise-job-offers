import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    let userId: number;
    const testUser = {
        login: 'test',
        password: '12345',
    };

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (POST)', () => {
        return request(app.getHttpServer())
            .post('/users')
            .send(testUser)
            .expect(201)
            .expect((res) => {
                const result = res.body;
                expect(result.id).toBeDefined();
                expect(result.login).toEqual(testUser.login);
                expect(result.password).toBeUndefined();
                expect(result.creationDate).toBeDefined();
                userId = result.id;
            });
    });

    it('/users (GET)', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect((res) => {
                const result = res.body;
                expect(result).toBeInstanceOf(Array);
                expect(result.length).toEqual(1);
                expect(result[0].id).toBeDefined();
                expect(result[0].login).toEqual(testUser.login);
                expect(result[0].password).toBeUndefined();
                expect(result[0].creationDate).toBeDefined();
            });
    });

    it('/user/:userId (GET)', () => {
        expect(userId).toBeDefined();
        return request(app.getHttpServer())
            .get(`/users/${userId}`)
            .expect(200)
            .expect((res) => {
                const result = res.body;
                expect(result.id).toEqual(userId);
                expect(result.login).toEqual(testUser.login);
                expect(result.password).toBeUndefined();
                expect(result.creationDate).toBeDefined();
            });
    });

    afterAll(() => {
        app.close();
    });

});

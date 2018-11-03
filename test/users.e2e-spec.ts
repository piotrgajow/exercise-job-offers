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

    it('/users (DELETE)', () => {
        expect(userId).toBeDefined();
        return request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual('Deleted');
                userId = undefined;
            });
    });

    afterAll(() => {
        app.close();
    });

});

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

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
        const user = {
            login: 'test',
            password: '12345',
        };

        return request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(201)
            .expect((res) => {
                const result = res.body;
                expect(result.id).toBeDefined();
                expect(result.login).toEqual(user.login);
                expect(result.password).toBeUndefined();
                expect(result.creationDate).toBeDefined();
            });
    });

});

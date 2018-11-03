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
    const newUserData = {
        login: 'john',
        password: '1037sdh2Adhf',
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

    it('create user', () => {
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

    it('get all users return created user', () => {
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

    it('update existing user', async () => {
        expect(userId).toBeDefined();
        return request(app.getHttpServer())
            .put(`/users/${userId}`)
            .send(newUserData)
            .expect(200)
            .expect((res) => {
                const result = res.body;
                expect(result.id).toEqual(userId);
                expect(result.login).toEqual(newUserData.login);
                expect(result.password).toBeUndefined();
                expect(result.creationDate).toBeDefined();
                testUser.login = newUserData.login;
            });
    });

    it('get user by id', () => {
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

    it('delete existing user', () => {
        expect(userId).toBeDefined();
        return request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual('Deleted');
                userId = undefined;
            })
            .then(() => {
                return request(app.getHttpServer())
                    .get('/users')
                    .expect(200)
                    .expect((resInner) => {
                        const result = resInner.body;
                        expect(result).toBeInstanceOf(Array);
                        expect(result.length).toEqual(0);
                    });
            });
    });

    it('get user by id throws error if user does not exist', () => {
        return request(app.getHttpServer())
            .get('/users/404')
            .expect(404)
            .expect((res) => {
                const result = res.body;
                expect(result.message).toEqual('User with id 404 does not exist');
            });
    });

    it('update user throws error if user does not exist', () => {
        return request(app.getHttpServer())
            .put('/users/404')
            .send(newUserData)
            .expect(404)
            .expect((res) => {
                const result = res.body;
                expect(result.message).toEqual('User with id 404 does not exist');
            });
    });

    afterAll(() => {
        app.close();
    });

});

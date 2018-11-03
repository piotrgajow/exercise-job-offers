import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserCommand } from './dto/create-user-command.dto';
import { UpdateUserCommand } from './dto/update-user-command.dto';
import { mockRepository } from '../shared/test-utils';

describe('UsersService', () => {

    let service: UsersService;
    let userRepository: Repository<User>;
    const mockedUserRepository = mockRepository(User);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: 'UserRepository', useValue: mockedUserRepository },
            ],
        }).compile();
        service = module.get<UsersService>(UsersService);
        userRepository = module.get('UserRepository');
    });

    beforeEach(() => {
        mockedUserRepository.reset();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createUser', () => {

        const command = {
            login: 'user1',
            password: 'secret',
        } as CreateUserCommand;

        it('should persist user in database', async () => {
            jest.spyOn(userRepository, 'save');

            const result = await service.createUser(command);

            expect(userRepository.save).toHaveBeenCalled();
            expect(result.id).toBeDefined();
            expect(result.login).toEqual(command.login);
            expect(result.password).toEqual(command.password);
            expect(result.creationDate).toBeDefined();
        });

    });

    describe('getAllUsers', () => {

        it('should return list of existing users', async () => {
            mockedUserRepository.initialize(2);
            jest.spyOn(userRepository, 'find');

            const result = await service.getAllUsers();

            expect(userRepository.find).toHaveBeenCalled();
            expect(result.length).toEqual(2);
        });

    });

    describe('getUserById', () => {

        it('should return user found by id', async () => {
            mockedUserRepository.initialize(16);
            const userId = 15;
            jest.spyOn(userRepository, 'findOne');

            const result = await service.getUserById(userId);

            expect(userRepository.findOne).toHaveBeenCalled();
            expect(result.id).toEqual(userId);
        });

    });

    describe('deleteUser', () => {

        const userId = 143;

        it('should remove given user', async () => {
            jest.spyOn(userRepository, 'delete');

            await service.deleteUser(userId);

            expect(userRepository.delete).toHaveBeenCalledWith(userId);
        });

    });

    describe('updateUser', () => {

        const userId = 11;
        const command = {
            login: 'xyz',
            password: 'pass',
        } as UpdateUserCommand;

        it('should update given user data', async () => {
            mockedUserRepository.initialize(15);
            jest.spyOn(userRepository, 'update');

            const result = await service.updateUser(userId, command);

            expect(userRepository.update).toHaveBeenCalledWith(userId, command);
            expect(result.id).toEqual(userId);
            expect(result.login).toEqual(command.login);
            expect(result.password).toEqual(command.password);
        });

    });

});

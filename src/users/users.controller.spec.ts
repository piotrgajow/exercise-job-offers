import { Test, TestingModule } from '@nestjs/testing';

import { LocalDateTime } from 'js-joda';
import { Repository } from 'typeorm';

import { UsersController } from './users.controller';
import { CreateUserCommand } from './dto/create-user-command.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('Users Controller', () => {

    let module: TestingModule;
    let controller: UsersController;
    let usersService: UsersService;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [
                UsersController,
            ],
            providers: [
                UsersService,
                { provide: 'UserRepository', useValue: Repository },
            ],
        }).compile();
        controller = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createUser', () => {

        const createUserCommand = {
            login: 'test',
            password: '12356',
        } as CreateUserCommand;

        const createdUser = {
            id: 13,
            login: createUserCommand.login,
            password: createUserCommand.password,
            creationDate: LocalDateTime.now().toString(),
        } as User;

        it('should call service and return created user', async () => {
            jest.spyOn(usersService, 'createUser').mockImplementation(() => createdUser);

            const result = await controller.createUser(createUserCommand);

            expect(usersService.createUser).toHaveBeenCalledWith(createUserCommand);
            expect(result.id).toEqual(createdUser.id);
            expect(result.login).toEqual(createdUser.login);
            expect(result.password).toBeUndefined();
            expect(result.creationDate).toEqual(createdUser.creationDate);
        });

    });

    describe('getAllUsers', () => {

        const user1 = mockUser('admin', 'secretPassword');
        const user2 = mockUser('user', '12345');

        it('should call service and return list of all users', async () => {
            jest.spyOn(usersService, 'getAllUsers').mockImplementation(() => [user1, user2]);

            const result = await controller.getAllUsers();

            expect(usersService.getAllUsers).toHaveBeenCalled();
            expect(result.length).toEqual(2);
            expect(result[0].login).toEqual('admin');
            expect(result[0].password).toBeUndefined();
            expect(result[1].login).toEqual('user');
            expect(result[1].password).toBeUndefined();
        });

    });

    describe('getUserById', () => {

        const user = mockUser('user', 'pass');

        it('should call service and return found user', async () => {
            const userId = user.id;
            jest.spyOn(usersService, 'getUserById').mockImplementation(() => user);

            const result = await controller.getUserById(userId);

            expect(usersService.getUserById).toHaveBeenCalledWith(userId);
            expect(result.id).toEqual(userId);
            expect(result.password).toBeUndefined();
            expect(result.login).toEqual(user.login);
            expect(result.password).toBeUndefined();
        });

    });

    describe('deleteUser', () => {

        const userId = 13;

        it('should call service and return deleted message', async () => {
            jest.spyOn(usersService, 'deleteUser').mockImplementation(() => undefined);

            const result = await controller.deleteUser(userId);

            expect(usersService.deleteUser).toHaveBeenCalledWith(userId);
            expect(result).toEqual('Deleted');
        });

    });

    function mockUser(login: string, password: string): User {
        return {
            id: Math.floor(Math.random() * 100 + 1),
            login,
            password,
            creationDate: LocalDateTime.now().toString(),
        } as User;
    }

});

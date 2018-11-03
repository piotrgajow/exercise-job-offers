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

});

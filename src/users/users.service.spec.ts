import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserCommand } from './dto/create-user-command.dto';

const mockRepository = <T>(domain: T) => {
    return {
        save: jest.fn().mockImplementation((input) => {
            input.id = Math.floor(Math.random() * 100 + 1);
            return input;
        }),
        find: jest.fn().mockImplementation(() => {
            return [{} as T, {} as T];
        }),
        delete: jest.fn(),
    };
};

describe('UsersService', () => {

    let service: UsersService;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: 'UserRepository', useValue: mockRepository(User) },
            ],
        }).compile();
        service = module.get<UsersService>(UsersService);
        userRepository = module.get('UserRepository');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createUser', () => {

        it('should persist user in database', async () => {
            const command = {
                login: 'user1',
                password: 'secret',
            } as CreateUserCommand;
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
            jest.spyOn(userRepository, 'find');

            const result = await service.getAllUsers();

            expect(userRepository.find).toHaveBeenCalled();
            expect(result.length).toEqual(2);
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

});

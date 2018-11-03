import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LocalDateTime } from 'js-joda';
import { Repository } from 'typeorm';

import { CreateUserCommand } from './dto/create-user-command.dto';
import { User } from './entities/user.entity';
import { UpdateUserCommand } from './dto/update-user-command.dto';
import { UserNotFound } from './exceptions/user-not-found';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async createUser(command: CreateUserCommand): Promise<User> {
        const user = {
            login: command.login,
            password: command.password,
            creationDate: LocalDateTime.now().toString(),
        } as User;

        await this.userRepository.save(user);
        return user;
    }

    async getAllUsers(): Promise<Array<User>> {
        return await this.userRepository.find();
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new UserNotFound(userId);
        }
        return user;
    }

    async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }

    async updateUser(userId: number, command: UpdateUserCommand): Promise<User> {
        await this.userRepository.update(userId, command);
        return await this.getUserById(userId);
    }

}

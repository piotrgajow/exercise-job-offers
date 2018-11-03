import { Injectable } from '@nestjs/common';

import { LocalDateTime } from 'js-joda';

import { CreateUserCommand } from './dto/create-user-command.dto';
import { User } from './domain/user.domain';

@Injectable()
export class UsersService {

    createUser(command: CreateUserCommand): User {
        return {
            id: 1,
            login: command.login,
            creationDate: LocalDateTime.now(),
        } as User;
    }

}

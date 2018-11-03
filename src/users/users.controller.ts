import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserCommand } from './dto/create-user-command.dto';
import { User } from './domain/user.domain';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Post('/')
    createUser(@Body() body: CreateUserCommand): User {
        return this.usersService.createUser(body);
    }

}

import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserCommand } from './dto/create-user-command.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Post('/')
    async createUser(@Body() body: CreateUserCommand): Promise<User> {
        const user = await this.usersService.createUser(body);
        delete user.password;
        return user;
    }

}

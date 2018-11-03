import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

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
        removePassword(user);
        return user;
    }

    @Get('/')
    async getAllUsers(): Promise<Array<User>> {
        const users = await this.usersService.getAllUsers();
        users.forEach(removePassword);
        return users;
    }

    @Delete('/:userId')
    async deleteUser(@Param('userId') userId: number): Promise<string> {
        await this.usersService.deleteUser(userId);
        return 'Deleted';
    }

}

function removePassword(user: User): void {
    delete user.password;
}

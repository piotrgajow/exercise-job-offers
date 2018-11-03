import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateUserCommand } from './dto/create-user-command.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserCommand } from './dto/update-user-command.dto';

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

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<User> {
        const user = await this.usersService.getUserById(userId);
        removePassword(user);
        return user;
    }

    @Delete('/:userId')
    async deleteUser(@Param('userId') userId: number): Promise<string> {
        await this.usersService.deleteUser(userId);
        return 'Deleted';
    }

    @Put('/:userId')
    async updateUser(@Param('userId') userId: number, @Body() command: UpdateUserCommand): Promise<User> {
        const user = await this.usersService.updateUser(userId, command);
        removePassword(user);
        return user;
    }

}

function removePassword(user: User): void {
    delete user.password;
}

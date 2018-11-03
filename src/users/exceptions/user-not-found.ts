import { HttpException } from '@nestjs/common';

export class UserNotFound extends HttpException {

    constructor(
        userId: number,
    ) {
        super(`User with id ${userId} does not exist`, 404);
    }

}

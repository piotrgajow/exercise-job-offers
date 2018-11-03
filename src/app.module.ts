import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

const dataSourceConfiguration = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'job_offers',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
} as TypeOrmModuleOptions;

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forRoot(dataSourceConfiguration),
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
        UsersService,
    ],
})
export class AppModule {
}

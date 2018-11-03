import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JobOffersModule } from './job-offers/job-offers.module';

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
        TypeOrmModule.forRoot(dataSourceConfiguration),
        UsersModule,
        JobOffersModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {
}

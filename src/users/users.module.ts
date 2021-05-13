import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { UsersService } from './user/users.service'
import { UsersController } from './user/users.controller'
import { AppService } from './user/app.service'
import { UserSubscriber } from './user/users.subscriber'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    exports: [UsersService, AppService, UserSubscriber],
    providers: [UsersService, AppService, UserSubscriber]
})
export class UsersModule { }

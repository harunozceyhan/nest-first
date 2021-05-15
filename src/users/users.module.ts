import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { UsersService } from './user/users.service'
import { UsersController } from './user/users.controller'
import { City } from './city/city.entity'
import { CityService } from './city/city.service'
import { CityController } from './city/city.controller'
import { AppService } from './user/app.service'
import { UserSubscriber } from './user/users.subscriber'

@Module({
    imports: [TypeOrmModule.forFeature([User, City])],
    controllers: [UsersController, CityController],
    exports: [UsersService, AppService, UserSubscriber, CityService],
    providers: [UsersService, AppService, UserSubscriber, CityService]
})
export class UsersModule { }

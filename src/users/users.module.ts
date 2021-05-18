import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { UsersService } from './user/users.service'
import { UsersController } from './user/users.controller'
import { City } from './city/city.entity'
import { CityService } from './city/city.service'
import { CityController } from './city/city.controller'
import { Town } from './town/town.entity'
import { TownService } from './town/town.service'
import { TownController } from './town/town.controller'
import { District } from './district/district.entity'
import { DistrictService } from './district/district.service'
import { DistrictController } from './district/district.controller'
import { AppService } from './user/app.service'
import { UserSubscriber } from './user/users.subscriber'

@Module({
    imports: [TypeOrmModule.forFeature([User, City, Town, District])],
    controllers: [UsersController, CityController, TownController, DistrictController],
    exports: [UsersService, AppService, UserSubscriber, CityService, TownService, DistrictService],
    providers: [UsersService, AppService, UserSubscriber, CityService, TownService, DistrictService]
})
export class UsersModule { }

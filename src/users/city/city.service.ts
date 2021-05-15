import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { City } from './city.entity'

@Injectable()
export class CityService extends TypeOrmCrudService<City> {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(@InjectRepository(City) repo) {
        super(repo)
    }
}

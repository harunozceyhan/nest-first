import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Town } from './town.entity'

@Injectable()
export class TownService extends TypeOrmCrudService<Town> {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(@InjectRepository(Town) repo) {
        super(repo)
    }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { District } from './district.entity'

@Injectable()
export class DistrictService extends TypeOrmCrudService<District> {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(@InjectRepository(District) repo) {
        super(repo)
    }
}

import { Controller, Get } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'
import { District } from './district.entity'
import { DistrictService } from './district.service'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Reflector } from '@nestjs/core'

//@Roles('USER:*')
//@Roles('USER:GET')
@Roles('USER:GET', 'USER:POST', 'USER:PUT', 'USER:PATCH', 'USER:DELETE')
@Crud({ model: { type: District }, params: { id: { field: 'id', type: 'uuid', primary: true } }, query: { join: { town: { eager: true } } } })
@Controller('district')
export class DistrictController implements CrudController<District> {
    constructor(public service: DistrictService, private reflector: Reflector) { }

    @Get('metadata')
    metadata(): any {
        return this.reflector.get<any>('metaclass', District)
    }

}

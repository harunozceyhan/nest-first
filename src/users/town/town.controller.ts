import { Controller, Get } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'
import { Town } from './town.entity'
import { TownService } from './town.service'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Reflector } from '@nestjs/core'

//@Roles('USER:*')
//@Roles('USER:GET')
@Roles('USER:GET', 'USER:POST', 'USER:PUT', 'USER:PATCH', 'USER:DELETE')
@Crud({ model: { type: Town }, params: { id: { field: 'id', type: 'uuid', primary: true } }, query: { join: { city: { eager: true } } } })
@Controller('town')
export class TownController implements CrudController<Town> {
    constructor(public service: TownService, private reflector: Reflector) { }

    @Get('metadata')
    metadata(): any {
        return this.reflector.get<any>('metaclass', Town)
    }

}

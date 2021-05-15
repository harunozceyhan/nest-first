import { Controller, Get } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'
import { City } from './city.entity'
import { CityService } from './city.service'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Reflector } from '@nestjs/core'

//@Roles('USER:*')
//@Roles('USER:GET')
@Roles('USER:GET', 'USER:POST', 'USER:PUT', 'USER:PATCH', 'USER:DELETE')
@Crud({ model: { type: City }, params: { id: { field: 'id', type: 'uuid', primary: true } } })
@Controller('city')
export class CityController implements CrudController<City> {
    constructor(public service: CityService, private reflector: Reflector) { }

    @Get('metadata')
    metadata(): any {
        return this.reflector.get<any>('metaclass', City)
    }

}

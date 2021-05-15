import { Controller, Get } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Reflector } from '@nestjs/core'

//@Roles('USER:*')
//@Roles('USER:GET')
@Roles('USER:GET', 'USER:POST', 'USER:PUT', 'USER:PATCH', 'USER:DELETE')
@Crud({ model: { type: User }, params: { id: { field: 'id', type: 'uuid', primary: true } }, query: { join: { city: { eager: true } } } })
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService, private reflector: Reflector) { }

    @Get('metadata')
    metadata(): any {
        return this.reflector.get<any>('metaclass', User)
    }

}

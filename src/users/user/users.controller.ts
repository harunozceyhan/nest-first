import { Controller } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { Roles } from 'src/auth/decorators/roles.decorator'

//@Roles('USER:*')
//@Roles('USER:GET')
@Roles('USER:GET', 'USER:POST', 'USER:PUT', 'USER:PATCH', 'USER:DELETE')
@Crud({ model: { type: User } })
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) { }
}

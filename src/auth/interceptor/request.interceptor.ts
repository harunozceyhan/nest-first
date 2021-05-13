import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { verify } from 'jsonwebtoken'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const globalAny: any = global
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token === undefined || token === null)
            throw new HttpException('Token Not Found', HttpStatus.UNAUTHORIZED)

        try {
            const decoded: any = verify(token, globalAny.publicKey, { algorithms: ['RS256'] })
            const userRoles: any[] = [...decoded.realm_access.roles.map(userRole => userRole + ':' + request.method), ...decoded.realm_access.roles.map(userRole => userRole + ':*')]
            const apiRoles: any[] = this.reflector.get<string[]>('roles', context.getClass())
            const found = apiRoles === undefined || userRoles.includes('ADMIN') || apiRoles.some(apiRole => userRoles.includes(apiRole))
            if (!found) throw new HttpException('Role Not Found', HttpStatus.FORBIDDEN)
        } catch (err) {
            throw new HttpException(err, HttpStatus.UNAUTHORIZED)
        }

        return next.handle()
    }
}
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getHello() {
        console.log('Hello World!')
    }
}

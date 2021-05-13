import { Injectable, OnModuleInit, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService implements OnModuleInit {
    constructor(private httpService: HttpService, private readonly configService: ConfigService) { }

    getHello(): string {
        console.log('Hello World!')
        return 'Hello World!'
    }
    async onModuleInit(): Promise<void> {
        const globalAny: any = global
        const response = await this.httpService.get(this.configService.get('realm.url')).toPromise()
        globalAny.publicKey = `-----BEGIN CERTIFICATE-----\n${response.data.keys[0].x5c[0]}\n-----END CERTIFICATE-----`
    }
}

import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { RequestInterceptor } from './auth/interceptor/request.interceptor'
import { Reflector } from '@nestjs/core'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.useGlobalInterceptors(new RequestInterceptor(app.get(Reflector)))
    await app.listen(parseInt(process.env.PORT, 10) || 3000)
}
bootstrap()

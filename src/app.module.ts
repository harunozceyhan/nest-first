import { Module, HttpModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { FilesModule } from './file/files.module'
import databaseConfiguration from './config/database.config'
import authConfiguration from './config/auth.config'

@Module({
    imports: [ConfigModule.forRoot({ load: [databaseConfiguration, authConfiguration], isGlobal: true }), HttpModule, DatabaseModule, UsersModule, FilesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

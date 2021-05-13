import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { MulterModule } from '@nestjs/platform-express'
import { GridFsMulterConfigService } from './multer-config.service'
import { FilesService } from './files.service'
import { MongoDBModule } from '../database/mongodb.module'

@Module({
    imports: [MongoDBModule, MulterModule.registerAsync({ useClass: GridFsMulterConfigService })],
    controllers: [FilesController],
    providers: [GridFsMulterConfigService, FilesService],
})
export class FilesModule { }
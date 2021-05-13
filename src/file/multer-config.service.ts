/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express'
import * as GridFsStorage from 'multer-gridfs-storage'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {

    gridFsStorage: GridFsStorage

    constructor(private readonly configService: ConfigService) {
        this.gridFsStorage = new GridFsStorage({
            url: this.configService.get('mongodb.url'),
            file: (req, file) => {
                return new Promise((resolve, reject) => { resolve({ filename: file.originalname.trim() }) })
            }
        })
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        }
    }
}
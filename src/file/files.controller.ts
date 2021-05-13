/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Post, Get, Delete, Param, Res, Controller, UseInterceptors, UploadedFiles, UploadedFile, HttpException, HttpStatus } from '@nestjs/common'
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { FileResponseVm } from './file-response-vm.entity'
import { Roles } from 'src/auth/decorators/roles.decorator'

@Roles('USER:*', 'SHOP:GET')
@Controller('/attachment/files')
export class FilesController {
    constructor(private filesService: FilesService) { }

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file) {
        const response = []
        const fileReponse = { originalname: file.originalname, encoding: file.encoding, mimetype: file.mimetype, id: file.id, filename: file.filename, metadata: file.metadata, bucketName: file.bucketName, chunkSize: file.chunkSize, size: file.size, md5: file.md5, uploadDate: file.uploadDate, contentType: file.contentType }
        response.push(fileReponse)
        return response
    }

    @Post('bulk')
    @UseInterceptors(FilesInterceptor('file'))
    uploads(@UploadedFiles() files) {
        const response = []
        files.forEach(file => {
            const fileReponse = { originalname: file.originalname, encoding: file.encoding, mimetype: file.mimetype, id: file.id, filename: file.filename, metadata: file.metadata, bucketName: file.bucketName, chunkSize: file.chunkSize, size: file.size, md5: file.md5, uploadDate: file.uploadDate, contentType: file.contentType }
            response.push(fileReponse)
        })
        return response
    }

    @Get('info/:id')
    async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return { message: 'File has been detected', file: file }
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType)
        return filestream.pipe(res)
    }

    @Get('download/:id')
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType)
        res.header('Content-Disposition', 'attachment; filename=' + file.filename)
        return filestream.pipe(res)
    }

    @Delete('delete/:id')
    async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.deleteFile(id)
        if (!filestream) {
            throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED)
        }
        return { message: 'File has been deleted', file: file }
    }
}
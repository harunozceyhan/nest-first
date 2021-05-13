import { Expose } from 'class-transformer'

export class FileInfoVm {

    @Expose()
    length: number

    @Expose()
    chunkSize: number

    @Expose()
    filename: string

    @Expose()
    md5: string

    @Expose()
    contentType: string
}
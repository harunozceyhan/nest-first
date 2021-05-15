/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SetMetadata } from '@nestjs/common'

export const Metaclass = (data: any): any => SetMetadata('metaclass', data)
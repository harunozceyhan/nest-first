/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm'
import { InjectConnection } from '@nestjs/typeorm'
import { User } from './user.entity'
import { AppService } from './app.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(@InjectConnection() readonly connection: Connection, private readonly appService: AppService) {
        connection.subscribers.push(this)
    }

    listenTo() {
        return User
    }

    beforeInsert(event: InsertEvent<User>) {
        this.appService.getHello()
        console.log('BEFORE POST INSERTED: ', event.entity)
    }

    afterInsert(event: InsertEvent<User>) {
        console.log('AFTER ENTITY INSERTED: ', event.entity)
    }

}
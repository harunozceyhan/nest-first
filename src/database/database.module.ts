import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.database'),
                schema: configService.get('database.schema'),
                entities: ['dist/**/*.entity.js'],
                migrationsTableName: 'migration',
                migrations: ['dist/**/*.migration{.ts,.js}'],
                cli: {
                    migrationsDir: 'src/migration',
                },
                synchronize: true,
                logging: false,
                namingStrategy: new SnakeNamingStrategy()
            })
        }),
    ],
})
export class DatabaseModule { }
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => ({
    database: {
        host: process.env.TYPEORM_HOST,
        port: 5432,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        schema: process.env.TYPEORM_SCHEMA
    },
    mongodb: {
        url: process.env.MONGO_URL
    }
})
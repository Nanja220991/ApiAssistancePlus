console.log(process.env.TYPEORM_HOST);
module.exports = {
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: true,
  secretKey: "Shashangka Shekhar",
  algorithm: 'HS256',
  entities: [
    __dirname + '/entities/**/*.js'
  ],
  subscribers: [
    "dist/subscriber/*.js"
  ],
  migrations: [
    process.env.TYPEORM_MIGRATIONS
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
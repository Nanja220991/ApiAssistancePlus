module.exports = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "assiqkps_ops",
    "password": "qTw@JSuXN3CL",
    "database": "assiqkps_medmanager_local",
    "synchronize": false,
    "logging": false,
    "entities": [
       '**/entity/*{.ts,.js}'
    ],
    "migrations": [
       `src/migration/**/*.{js,ts}`
    ],
    "subscribers": [
       `src/subscriber/**/*.{js,ts}`
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
}
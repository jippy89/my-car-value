import { DataSourceOptions, DataSource } from "typeorm"
import { SeederOptions } from "typeorm-extension"

const dataSourceOptions: Partial<DataSourceOptions> & SeederOptions = {
  synchronize: false,
}

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      synchronize: true,
      type: 'sqlite',
      database: 'db.sqlite',
      // TypeORM CLI reads from the root of the project
      entities: ['dist/src/**/*.entity.js'],
      migrations: ['dist/src/db/migrations/*.js'],

      // For the `typeorm-extension` package
      seeds: ['dist/src/db/seeders/*.seeder.js'],
      factories: ['dist/src/db/factories/*.factory.js'],
    })
    break
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/db/migrations/*.ts'],
      migrationsRun: true,
    })
    break
  case 'production':
    Object.assign(dataSourceOptions, {
      // type: 'postgres',
      type: 'sqlite',
      database: 'production.sqlite',
      entities: ['dist/src/**/*.entity.js'],
      migrations: ['dist/src/db/migrations/*.js'],
      migrationsRun: true,
    })
    break

  default:
    throw new Error('Unknown environment')
}

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions & SeederOptions)

export { dataSourceOptions }
export default dataSource
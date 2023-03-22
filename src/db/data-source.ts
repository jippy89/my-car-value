import { DataSourceOptions, DataSource } from "typeorm"

const dataSourceOptions: Partial<DataSourceOptions> = {
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

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions)

export { dataSourceOptions }
export default dataSource
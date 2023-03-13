import { DataSourceOptions, DataSource } from "typeorm"

const dataSourceOptions: Partial<DataSourceOptions> = {
  synchronize: false,
}

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      synchronize: true,
      database: 'db.sqlite',
      entities: ['../**/*.entity.js'],
    })
    break
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      synchronize: true,
      database: 'test.sqlite',
      entities: ['../**/*.entity.ts'],
    })
    break
  case 'production':
    break

  default:
    throw new Error('Unknown environment')
}

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions)

export { dataSourceOptions }
export default dataSource
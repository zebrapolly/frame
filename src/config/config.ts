const {
  DB_HOST, DB_PORT, DB_USER, DB_PASSWORD,
  PORT, HOST
} = process.env;

const config: IConfig = {
  protocol: 'https',
  apiHost: 'carsmile/user',
  apiVersion: '1.0',
  host: 'localhost' || HOST,
  port: 3010 || Number.parseInt(PORT),
  debug: true,
  db: {
    mysql: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '12345',
      database: 'CSKAAuth',
      driver: 'mysql',
      charset: 'utf8mb4'
    },
    postgres: {
      host: '127.0.0.1',
      port: 54323,
      user: 'carsmile',
      password: '12345',
      database: 'carsmile',
      driver: 'postgres',
      charset: 'utf8mb4'
    }
  },
  sources: {
    users: 'users.users'
  }
}

export default config;
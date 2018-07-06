export class dbAdapter {
  private di: DI
  private dbsConfig: {[key: string]: dbConfig}
  constructor(di: DI) {
    this.di = di;
    this.dbsConfig = di.get('config').db;
  }
  init() {
    for (const db in this.dbsConfig) {
      const dbCredits = this.dbsConfig[db]
      if (this.dbsConfig[db].driver === 'mysql') {
        this.initMySQL(db, dbCredits);
      }
      if (this.dbsConfig[db].driver === 'postgres') {
        this.initPSQL(db, dbCredits);
      } 
    }
  }
  private initMySQL(name: string, dbCredits: dbConfig) {
    const knex = require('knex')
    const connection = knex({
      client: 'mysql',
      connection: dbCredits
      })
    this.di.setService(name, connection)
  }
  private async initPSQL(name: string, dbCredits: dbConfig) {
    const knex = require('knex')
    const connection = knex({
      client: 'pg',
      connection: dbCredits
      })
    this.di.setService(name, connection)
  }
}

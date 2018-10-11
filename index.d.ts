import * as Salak from 'salak'

type mongoClient = {
  uri: string
  options: Salak.PlainObject
}

declare module 'salak' {
  interface SalakConfig {
    mongo: {
      dirname: string
      extend: string[]
      client: mongoClient
      clients: Salak.PlainObject<mongoClient>
      options: Salak.PlainObject
    }
  }
}

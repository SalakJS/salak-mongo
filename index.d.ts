import * as OriginSalak from 'salak'
import * as mongoose from 'mongoose'

type mongoClient = {
  uri: string
  options: OriginSalak.PlainObject
}

export import mongoose = mongoose

declare module 'salak' {
  interface SalakConfig {
    mongo: {
      enable: boolean
      dirname: string
      extend: string | string[]
      client: mongoClient
      clients: OriginSalak.PlainObject<mongoClient>
      options: OriginSalak.PlainObject
    }
  }

  interface Service {
    model (name: string, module?: string): mongoose.Model<mongoose.Document>
  }

  interface Salak extends OriginSalak {
    mongo: mongoose.Connection
    mongos: {
      [prop: string]: mongoose.Connection
    }
  }
}

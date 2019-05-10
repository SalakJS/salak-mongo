import * as Salak from 'salak'
import * as mongoose from 'mongoose'

type mongoClient = {
  uri: string
  options: Salak.PlainObject
}

export import mongoose = mongoose

declare module 'salak' {
  interface SalakConfig {
    mongo: {
      enable: boolean
      dirname: string
      extend: string | string[]
      client: mongoClient
      clients: Salak.PlainObject<mongoClient>
      options: Salak.PlainObject
    }
  }

  interface Service {
    model (name: string, module?: string): mongoose.Model<mongoose.Document>
  }
}

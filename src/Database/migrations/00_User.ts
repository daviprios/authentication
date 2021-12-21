import { Knex } from 'knex'

export const up = async (knex: Knex) => {
  await knex.schema.hasTable('user')
  .then(async (has: any) => {
    if(has) return
    await knex.schema.createTable('user', column => {
      column.increments('id').primary()
      column.string('username').unique().notNullable()
      column.string('email').unique().notNullable()
      column.string('password').notNullable()
    })
  })

  .catch(err => {
    console.log(err)
  })
}

export const down = async (knex: Knex) => {
  await knex.schema.hasTable('user')
  .then(async (has: any) => {
    if(!has) return
    await knex.schema.dropTable('user')
  })

  .catch(err => {
    console.log(err)
  })
}
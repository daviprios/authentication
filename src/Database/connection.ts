import knex from 'knex';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.db'
  },
  useNullAsDefault: true
});

export default connection;
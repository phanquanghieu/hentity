module.exports = {
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT || 3306),
  database: process.env.DATABASE_NAME || '',
  user: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  ssl: Boolean(process.env.DATABASE_SSL || false),
}

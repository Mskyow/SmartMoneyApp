export default () => ({
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  redis_host : process.env.REDIS_HOST,
  redis_port : process.env.REDIS_PORT,
  redis_password : process.env.REDIS_PASSWORD,
  cache_ttl : process.env.CACHE_TTL,
  secret_jwt: process.env.SECRET,
  expire_time_jwt: process.env.EXPIRE_TIME,
  solana_https_provider: process.env.SOLANA_HTTPS_PROVIDER,
  solana_wss_provider: process.env.SOLANA_wss_PROVIDER,
  helius_api_key: process.env.HELIUS_API_KEY
});

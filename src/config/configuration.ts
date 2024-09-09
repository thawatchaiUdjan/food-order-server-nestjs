export default () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    host: process.env.DB_CONNECTION_STRING_MONGO,
  },
  encryptSaltRounds: 10,
  token: {
    tokenExpiredError: 'TokenExpiredError',
    tokenExpiredTime: '6h',
  },
});

export default () => ({
  appConfig: {
    port: parseInt(process.env.APP_PORT) || 3000,
    jwtSecret: process.env.JWT_SECRET,
    database: {
      host: process.env.DB_CONNECTION_STRING_MONGO,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      secretId: process.env.GOOGLE_SECRET_ID,
      redirectUrl: 'postmessage',
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      secretId: process.env.FACEBOOK_SECRET_ID,
    },
    encryptSaltRounds: 10,
    token: {
      tokenExpiredError: 'TokenExpiredError',
      tokenExpiredTime: '6h',
    },
  },
});

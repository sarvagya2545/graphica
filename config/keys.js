module.exports = {
  mongoDBURL: process.env.NODE_ENV == 'production' ? process.env.MONGODB_URL_GLOBAL : process.env.MONGODB_URL_LOCAL,
  jwtSecret: process.env.JWT_SECRET
}
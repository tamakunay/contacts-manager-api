export const NODE_ENV = process.env.NODE_ENV || "dev"
export const PORT = process.env.PORT || 5003
export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/test"
export const SECRET = process.env.JWT_SECRET || "secret"
export const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"

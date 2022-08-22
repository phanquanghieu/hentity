module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
}

module.exports = {
  development: {
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: "quaranstream_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: "quaranstream_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};

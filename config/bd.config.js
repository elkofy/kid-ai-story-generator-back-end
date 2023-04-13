module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root", //For windows PASSWORD: "" || For mac PASSWORD: "root"
    DB: "bdd_ia_story",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
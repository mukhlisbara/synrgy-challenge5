import { Sequelize } from "sequelize";

const DB_ATTRIBUTE = {
    db_name: "synrgy-challenge5",
    db_user: "root",
    db_pass: "",
    db_addOn: {
        host: 'localhost',
        dialect: 'mysql'
    }
}

const DB = new Sequelize(
    DB_ATTRIBUTE.db_name,
    DB_ATTRIBUTE.db_user,
    DB_ATTRIBUTE.db_pass,
    DB_ATTRIBUTE.db_addOn
)

export default DB;
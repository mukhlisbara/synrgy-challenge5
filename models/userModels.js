import { Sequelize } from "sequelize";
import DB from "../config/database.js";

const {DataTypes} = Sequelize

const userFields = {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: DataTypes.STRING,
    token: DataTypes.STRING,
}

const User = DB.define('users', userFields, {freezeTableName: true})

export default User;

(async () => {
    await DB.sync()
})();
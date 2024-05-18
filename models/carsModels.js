import DB from "../config/database.js";
import { Sequelize } from "sequelize"; 

const { DataTypes } = Sequelize

const carFields = {
    carName: {
        type: DataTypes.STRING,
        validate: {
            Validator(value) {
                if (value === null || value === "") {
                    throw new Error("Car name can't be null or '' ");
                }
            }, 
        }
    },
    rentPrice: DataTypes.DOUBLE,
    carSize: DataTypes.STRING,
    carImage: DataTypes.STRING
}

const Car = DB.define('cars', carFields, {freezeTableName: true})

export default Car;

(async() => {
    await DB.sync()
})();
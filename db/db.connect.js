const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initDatabse = async () => {
    await mongoose.connect(mongoUri).then(() => {
        console.log("Database is connected")
    }).catch((error) => {
        console.log("Error connecting to database")
    })
}

module.exports = {initDatabse}
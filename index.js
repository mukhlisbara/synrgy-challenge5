import express from 'express';
import cors from 'cors';
import DB from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import carsRoute from './routes/carsRoute.js';
import usersRoute from './routes/usersRoute.js'
import viewsRoute from './routes/viewsRoute.js';

const app = express()
const PORT = process.env.PORT || 5000
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)

app.set("view engine", "ejs");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// api routes 
app.use('/api', carsRoute)
app.use('/api', usersRoute)

// view routes 
app.use(viewsRoute)
app.use('/public', express.static(path.join(__dirName, "public")))

app.listen(PORT, async () => {
    try {
        // to check db connection 
        await DB.authenticate()
        console.log('Connection has been established successfully.');
        console.log(`Server running on PORT ${PORT} at http://127.0.0.1:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})
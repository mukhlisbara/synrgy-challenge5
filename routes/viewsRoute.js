import express from 'express';
import Car from "../models/carsModels.js";
import authVerif from '../middleware/authVerify.js';
import { getAllCars, getDetailCars } from '../controllers/carsController.js';
import User from '../models/userModels.js';

const router = express.Router()

router.get('/' , authVerif, async (req, res) => {
    try {
        const accessToken = req.headers.cookie.split("=")[1]
        const cars = await Car.findAll()
        const user = await User.findOne({token: accessToken})

        for (const car of cars) {
            const newCreatedAt = new Date(car.createdAt);
            const newUpdatedAt = new Date(car.updatedAt);

            const formattedDayCreated = newCreatedAt.toLocaleString("id-ID", {
                weekday: "long"
            });

            const formattedDayUpdated = newUpdatedAt.toLocaleString("id-ID", {
                weekday: "long"
            });

            const formattedDateCreate = newCreatedAt.toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })

            const formattedDateUpdate = newUpdatedAt.toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })

            const formattedTimeCreate = newCreatedAt.toLocaleTimeString('it-IT', { hour: "2-digit", minute: "2-digit" })
            const formattedTimeUpdate = newUpdatedAt.toLocaleTimeString('it-IT', { hour: "2-digit", minute: "2-digit" })

            const fullDateCreate = formattedDayCreated + ', ' + formattedDateCreate + " ( " + formattedTimeCreate + " )";
            const fullDateUpdate = formattedDayUpdated + ', ' + formattedDateUpdate + " ( " + formattedTimeUpdate + " )";
            
            car['newCreatedAt'] = fullDateCreate
            car['newUpdatedAt'] = fullDateUpdate
        }
        res.render('homePage', { title: 'Home Page', carList: cars, user: user})
    } catch (err) {
        console.log(err)
    }
})

router.get('/login', (req, res) => {res.render('login', { title: 'Login'})})
router.get('/register', (req, res) => {res.render('register', { title: 'Register'})})
router.get('/dashboard', authVerif, async (req, res) => {
    try {
        const cars = await Car.findAll()
        res.render('homePage', { title: 'Home Page', data: cars})
    } catch (err) {
        console.log(err)
    }
})

router.get('/cars', authVerif, getAllCars)
router.get('/cars/addcars', authVerif, (req, res) => res.render('upsertCars', { title: 'Add Cars', breadcrumb_active_menu: 'Add New Car', car_id: "none", data: "none"}))
router.get('/cars/updatecars', authVerif, getDetailCars)

export default router;
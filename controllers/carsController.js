import Car from "../models/carsModels.js";
import fs from 'fs';
import { fileURLToPath } from "url";
import path from "path";


const baseFolder = `/public/uploads`
const __filename = fileURLToPath(import.meta.url)
const __dirnameFile = path.dirname(__filename)
const __dirnameRoot = path.dirname(__dirnameFile)

export const getAllCars = async (req, res) => {
    try {
        const response = await Car.findAll();
        
        for(const car of response) {
            const newUpdatedAt = new Date(car.updatedAt);

            const formattedDayUpdated = newUpdatedAt.toLocaleString("id-ID", {
                weekday: "long"
            });

            const formattedDateUpdate = newUpdatedAt.toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })

            const formattedTimeUpdate = newUpdatedAt.toLocaleTimeString('it-IT', { hour: "2-digit", minute: "2-digit" })

            const fullDateUpdate = formattedDayUpdated + ', ' + formattedDateUpdate + " ( " + formattedTimeUpdate + " )";
            
            car['newUpdatedAt'] = fullDateUpdate
        }

        res.render('listCars', {title: "List Car", carList: response})
        // return res.status(200).json({data: response})
    } catch (err) {
        return res.status(500).json({message: `Error Found: ${err}`})
    }
}

export const getDetailCars = async (req, res) => {
    const {id} = req.params

    try {
        const response = await Car.findOne({where: {id: id}})

        if (response == null || undefined) return res.status(404).json({message: "Data tidak ditemukan"})

        res.render('upsertCars', { title: 'Update Car Information', breadcrumb_active_menu: 'Update Car Information', data: response, car_id: id})
        // return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({message: `Error Found: ${err}`})
    }
}

export const createCars = async (req, res) => {
    try{
        const url = `${baseFolder}/${req.file.filename}`;

        req.body["carImage"] = url

        await Car.create(req.body)
        res.redirect('/cars')
    } catch (err) {
        return res.status(500).json({message: `Error Found: ${err}`})
    }
}

export const updateCars = async (req, res) => {
    const {id} = req.params
    console.log(req.body)

    try {
        const car = await Car.findOne({where: {id: id}})
        let urlImage

        if (car !== null || car !== undefined) {

            // for deleted upload file before update if changed 
            if (req.file !== undefined && car.carImage != req.body.carImage) {
                fs.unlink(path.join(__dirnameRoot, car.carImage), (err) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Could not delete the file. " + err,
                        });
                    }
                })

                const url = `${baseFolder}/${req.file.filename}`;
                req.body['carImage'] = url;
            }

            await car.update(req.body)
            res.redirect('/cars')
        } else {
            return res.status(400).json({
                message: `Car not found, please check your Car Id`
            })
        }
    } catch (err) {
      return res.status(500).json({message: `Error Found: ${err}`})
    }
}

export const deleteCars = async (req, res) => {
    const {id} = req.params
    
    try {
        const car = await Car.findOne({where: {id: id}})

        if (car !== null || car !== undefined) {
            fs.unlink(path.join(__dirnameRoot, car.carImage), (err) => {
                if (err) {
                    return res.status(500).send({
                        message: "Could not delete the file. " + err,
                    });
                }
            })

            await car.destroy()
            
            return res.status(201).json({
                message: `Car successfully deleted`,
                data: car
            })
        } else {
            return res.status(400).json({
                message: `Car not found, please check your Car Id`
            })
        }
    } catch (err) {
      return res.status(500).json({message: `Error Found: ${err}`})
    }
}
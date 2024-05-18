import express from 'express';
import { createCars, deleteCars, getAllCars, getDetailCars, updateCars } from '../controllers/carsController.js';
import upload from '../middleware/uploadImage.js';

const router = express.Router()
router.get('/cars', getAllCars)
router.get('/cars/:id', getDetailCars)
router.post('/cars', upload.single('carImage'), createCars)
router.post('/cars/:id', upload.single('carImage'), updateCars)
router.delete('/cars/:id', deleteCars)

export default router;
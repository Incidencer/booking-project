import express, { Request, Response } from 'express';
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from '../models/hotel';
import verifiyToken from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

// api/my-hotels
router.post('/', 
    verifiyToken,
    [
    body('name').notEmpty().withMessage('Name is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('city').notEmpty().withMessage('city is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night required, only numbers'),
    body('facilities').notEmpty().isArray().withMessage('Facilities required'),
    ],
    upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[]
        const newHotel: HotelType = req.body;
        

        //1. аплоуд изоображений для клоуднери

        const uploadPromises = imageFiles.map(async(image) => {
            const b64 = Buffer.from(image.buffer).toString('base64') // Преобразование изоображения в формат кодированя base64
            let dataURI='data:' + image.mimetype + ';base64,' + b64; // содержит data изоображения + png/jpg + base64 кодировка
            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.url
        })

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        
        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel)
    }catch(e) {
        console.log('Error creating hotel: ', e);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;
import multer from "multer";
import path from "path";
import { DATE } from "sequelize";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url)
const __dirNameMiddleware = path.dirname(__fileName)
const __dirName = path.dirname(__dirNameMiddleware)


const publicDirectory = path.join(__dirName, "public")
const uploadDirectory = path.join(publicDirectory, "uploads")

const storage = multer.diskStorage({
    
    // set destination of uploaded file
    destination: (req, res, cb) => {
        cb(null, uploadDirectory)
    },

    // generate new name for uploaded file 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        const newFileName = file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const upload = multer({storage: storage})
export default upload
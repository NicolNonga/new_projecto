import multer from "multer";
import path from "path";
import fs from "fs";
import {Request, Response, NextFunction} from 'express'
const uploadFolder = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
console.log("teste")
// Middleware que chama next
export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
 
    next(); // importantíssimo para passar para o controller
  });
};

import { Router } from "express";
import { QRCodeController } from "../../controllers/qrcodegenerate/QRCodeController";
import { QRCodeService } from "../../../application/services/qrcodegenerate/QRCodeService";
import { QRCodeRepository } from "../../../domain/repositories/qrcodegenerate/QRCodeRepository";

const QRCodeRoute = Router();

const qrCodeRepository = new QRCodeRepository();
const qrCodeService = new QRCodeService(qrCodeRepository);
const qrCodeController = new QRCodeController(qrCodeService);

QRCodeRoute.get("/generate", (req, res) => qrCodeController.generateQRCode(req, res));
QRCodeRoute.post("/decode", (req, res) => qrCodeController.decodeQRCode(req, res));

export {QRCodeRoute};
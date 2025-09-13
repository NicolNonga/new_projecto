// src/presentation/controllers/QRCodeController.ts
import { Request, Response } from "express";
import { QRCodeService } from "../../../application/services/qrcodegenerate/QRCodeService";

export class QRCodeController {
  constructor(private qrCodeService: QRCodeService) {}

  async generateQRCode(req: Request, res: Response) {
    try {
      const { text } = req.query;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Parâmetro 'text' é obrigatório" });
      }

      const qrCodeDataUrl = await this.qrCodeService.generate(text);
      res.json({ qrCodeDataUrl });
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar QR Code", details: error });
    }
  }

  async decodeQRCode(req: Request, res: Response) {
    try {
      const { qrCodeBase64 } = req.body;
      if (!qrCodeBase64 || typeof qrCodeBase64 !== "string") {
        return res.status(400).json({ error: "Campo 'qrCodeBase64' é obrigatório" });
      }

      const decodedText = await this.qrCodeService.decode(qrCodeBase64);
      res.json({ decodedText });
    } catch (error) {
      res.status(500).json({ error: "Erro ao decodificar QR Code", details: error });
    }
  }
}
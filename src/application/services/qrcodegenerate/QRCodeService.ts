// src/application/services/QRCodeService.ts
import { QRCodeRepository } from "../../../domain/repositories/qrcodegenerate/QRCodeRepository";

export class QRCodeService {
  constructor(private qrCodeRepository: QRCodeRepository) {}

  async generate(text: string): Promise<string> {
    // Pode adicionar regras, logs, etc
    return this.qrCodeRepository.generateQRCode(text);
  }

  async decode(qrCodeBase64: string): Promise<string> {
    return this.qrCodeRepository.decodeQRCode(qrCodeBase64);
  }
}

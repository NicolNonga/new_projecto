// src/infrastructure/repositories/QRCodeRepository.ts
import QRCode from "qrcode";
const Jimp = require("jimp");  // Alteração aqui
import QrCodeReader from "qrcode-reader";

export class QRCodeRepository {
  async generateQRCode(text: string): Promise<string> {
    // Gera o QRCode em formato base64
    return await QRCode.toDataURL(text);
  }

  async decodeQRCode(qrCodeBase64: string): Promise<string> {
    // Remove a parte do cabeçalho base64 e transforma em buffer
    const base64Data = qrCodeBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    
    // Lê a imagem com Jimp (a partir do buffer)
    const image = await Jimp.read(buffer);
    
    // Retorna a Promise para decodificar o QRCode
    return new Promise((resolve, reject) => {
      // Criação da instância do leitor de QRCode
      const qr = new QrCodeReader();
      
      // Callback para ler o QRCode
      qr.callback = (err: any, value: any) => {
        if (err || !value) return reject(err || new Error("QR inválido"));
        resolve(value.result); // Retorna o conteúdo do QRCode
      };
      
      // Decodifica o QRCode da imagem
      qr.decode(image.bitmap);
    });
  }
}
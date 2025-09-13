declare module 'qrcode-reader' {
  import Jimp from 'jimp';
  class QrCodeReader {
    decode(image: Jimp.Image['bitmap']): void;
    callback: (err: any, value: { result: string }) => void;
  }
  export default QrCodeReader;
}
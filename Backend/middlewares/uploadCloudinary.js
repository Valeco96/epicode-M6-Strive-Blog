import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configura cloudinary con le variabili di ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//qui va il codice per salvare l'immagine su Cloudinary e configurare il processo. L'immagine non é ancora sul database
const storageCloudinary = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Strive-Blog", // questo serve per le opzioni di salvataggio
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // opzionale
  },
});

const uploadCloudinary = multer({ storage: storageCloudinary });
// in questo modo, appena facciamo upload l'immagine viene caricata direttamente su cloudinary

export default uploadCloudinary;

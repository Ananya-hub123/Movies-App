import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  console.log("File filter debug:");
  console.log("Original name:", file.originalname);
  console.log("Extension:", extname);
  console.log("MIME type:", mimetype);
  console.log("Extension test:", filetypes.test(extname));
  console.log("MIME test:", mimetypes.test(mimetype));

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    console.log("File rejected - not an image");
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  console.log("=== UPLOAD DEBUG ===");
  console.log("Upload request received");
  console.log("Content-Type:", req.get('Content-Type'));
  console.log("Headers:", Object.keys(req.headers));
  console.log("Body keys:", Object.keys(req.body));
  console.log("Files:", req.files);
  console.log("File:", req.file);
  console.log("==================");
  
  uploadSingleImage(req, res, (err) => {
    if (err) {
      console.log("Upload error:", err);
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      console.log("File uploaded successfully:", req.file.path);
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `${process.env.BASE_URL || 'https://movies-app-production-ff8a.up.railway.app'}/${req.file.path}`,
      });
    } else {
      console.log("No file received");
      console.log("Req body:", req.body);
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
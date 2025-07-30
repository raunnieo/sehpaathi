const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const deleteImage = async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ success: false, message: "public_id is required" });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return res.status(500).json({ success: false, message: "Image deletion failed" });
  }
};

module.exports = {deleteImage}

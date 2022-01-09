const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs=require('fs');
//we will use this to upload images to cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//upload image by admin
router.post('/upload',auth,authAdmin, (req, res) => { 
  try { 
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.file;
    if (file.size > 1024 * 1024 * 5)//1megabit
      
    {removetmp(file.tempFilePath);
      return res.status(400).send("File size too large");
}    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' ) 
{
  removetmp(file.tempFilePath);
  return res.status(400).send("File type not supported");
}
    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
      if (err)
      { console.log(err); }
      removetmp(file.tempFilePath);
      res.json({public_id:result.public_id,url:result.secure_url});
    })
  }
  catch (err) { 
  return  res.status(500).json({msg: err.message});
  }
})
router.post("/destroy", auth, authAdmin, async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ msg: "No image select it" });
    }
    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) throw err;
      res.json({ msg: "Image deleted" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
const removetmp = (path) => { 
  fs.unlink(path, err => { 
    if (err)
    { console.log(err); }
    
  })
}
module.exports = router;
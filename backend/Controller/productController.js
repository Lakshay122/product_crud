const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const fs = require("fs");
const cloudinary = require("cloudinary");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.addProduct = catchAsyncError(async (req, res, next) => {
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    Object.keys(req.files).length > 1
  ) {
    return next(new ErrorHander("please upload one image", 400));
  }
  const file = req.files.file;
  if (!file) return next(new ErrorHander("please upload one image", 400));
  if (file.size > 20 * 1024 * 1024) {
    removeTmp(file.tempFilePath);
    return next(new ErrorHander("post Size too large", 400));
  }

  if (
    file.mimetype !== "image/jpeg" &&
    file.mimetype !== "image/png" &&
    file.mimetype != "video/mp4"
  ) {
    removeTmp(file.tempFilePath);

    return next(new ErrorHander("File format is incorrect.", 400));
  }
  // console.log(cloudinary)
  console.log(file)
  catchAsyncError( cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ProductImages" },
      async (err, result) => {
        console.log(err)
        if (err) return next(new ErrorHander(err, 400));
        console.log(result);
        removeTmp(file.tempFilePath);
        req.body.public_image_id = result.public_id;
        req.body.image = result.secure_url;
        const product = await Product.create(req.body)
          .then(() => {
            console.log("successfully");
          })
          .catch((err) => {
            return next(new ErrorHander(err, 400));
          });
        res.status(201).json({
          success: true,
          product:product,
        });
      }
    )
  );
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = Product.find(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product Not Found", 404));
    }
  
    if (req.files) {
      const file = req.files.file;
      if (file.size > 2 * 1024 * 1024) {
        removeTmp(file.tempFilePath);
        return next(new ErrorHander("Image Size too large", 400));
      }
  
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
  
        return next(new ErrorHander("File format is incorrect.", 400));
      }
      if (!req.body.public_image_id) {
        return next(
          new ErrorHander("public image id of previous image is required", 400)
        );
      }
      cloudinary.v2.uploader.destroy(
        req.body.public_image_id,
        async (err, result) => {
          if (err) return next(new ErrorHander(err, 400));
        }
      );
      console.log("destroy")
  
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "ProductImages" },
        async (err, result) => {
          removeTmp(file.tempFilePath);
          if (err) return next(new ErrorHander(err, 400));
          console.log(result);
  
  
         
          req.body.public_image_id = result.public_id;
          req.body.image = result.secure_url;
  
          // const file = req.files.file;
          // cloudinary.v2.uploader.destroy(req.body.public_image_id,async(err,result)=>{
          // if (err) return next(new ErrorHander(err,400));
            console.log(req.params.id)
          var product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
          //"helo");
           console.log(product)
          res.status(200).json({
            success: true,
            
          });
        }
      );
    }
    else{

       product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        res.status(200).json({
            success:true,
            message:"Product Changed Successfully"
          })
          // "helo");
        }
  });

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }
  req.body.public_image_id = product.public_image_id;
  cloudinary.v2.uploader.destroy(
    req.body.public_image_id,
    async (err, result) => {
      if (err) return next(new ErrorHander(err, 400));
    }
  );

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Prduct successfully Deleted",
  });
});

exports.getAllProduct = catchAsyncError(async(req,res,next)=>{
    const product =  await Product.find();
    res.status(200).json({
        success:true,
        product:product
    })
})

//remove the temp on uploading the images
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      return next(new ErrorHander(err, 400));
    }
  });
};


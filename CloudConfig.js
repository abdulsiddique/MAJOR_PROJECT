// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret  : process.env.CLOUDINARY_SECRET


    
// });
// const storage = new CloudinaryStorage({     
//     cloudinary: cloudinary,
//     params:{
//         folder: 'Wanderlsut_dev',
//         allowed_formats: ['png', 'jpg', 'jpeg'],
//     }
// });

// module.exports = { 
//     cloudinary,
//     storage 
//  };

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'wanderlust',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
};
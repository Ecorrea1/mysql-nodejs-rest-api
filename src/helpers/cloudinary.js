const { ServerError, DataError, ResultwithData } = require('../../helpers/result');
const { CreateNewHistoric } = require('../historic/historic.controller');
const cloudinary = require('cloudinary').v2;


export async function UploadImage ( img, filename, typeFile = 'base64'|'file' ) {
    if (!img || !uid) return DataError(res, 'Ingrese todos los datos');
    
    const file = typeFile === 'base64' ? 'data:image/jpeg;base64,' + img : img;
    try { 
        return await cloudinary.uploader.upload( file, { 
            public_id: filename,
            format: 'webp',
            unique_filename: true,
            folder: 'products',
            use_filename: true,
            overwrite: true,
            quality: "auto", 
            fetch_format: "auto",
            width: '600',
            crop: "scale"
        });

    } catch (error) {
        console.log({ error });
        return ServerError(res, error);
    }
}
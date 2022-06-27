require('dotenv').config();
// Required modules
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser')
const fileupload = require("express-fileupload");
//https://www.npmjs.com/package/dotenv
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration settings
// This will be fetched from the .env file in the root directory
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());


app.post('/upload', async function (req, res) {
    console.log('In Route req.files ', req.file, req.files)
    let file = req.files.image;
    console.log('file .....', file)
    if (req && req.files && req.files.image) {
        console.log('In If .....')
        let d = file.name.toString();
        fs.writeFile(d, file.data, 'binary', async function () {
            await cloudinary.uploader.upload(d).then(async (result) => {
                console.log('Result ......... ', result)
                if (result) {

                    fs.unlink(d, function (err) {
                        if (err) throw err;
                    });
                    res.send({ status: 200, message: 'File upload successfully !!', data: result.url })
                } else {
                    res.send({ status: 400, message: 'Error !!', data: err })
                }
            }).catch((err) => {
                console.log('Error ......... ', err);
                res.send({ status: 400, message: 'Error !!', data: err })
            })
        })
    } else {
        res.send({ status: 400, message: 'File not found !!', data: err })
    }
});

app.listen(PORT, function () {
    console.log('Node.js server is running on port ' + PORT);
});


//Create a server
// http.createServer(async (req, res) => {
//     if (req.url === '/upload' && req.method.toLowerCase() === 'post') {

//         console.log('In Route req.files ', req.file , req.files)
//         let file = req.files.image;
//         console.log('file .....', file)
//         if (req && req.files && req.files.image) {
//             console.log('In If .....')
//             return await new Promise((resolve, reject) => {
//                 let d = file.name.toString();
//                 fs.writeFile(d, file.data, 'binary', async function () {
//                     await cloudinary.uploader.upload(d).then(async (result) => {
//                         if (result) {

//                             fs.unlink(d, function (err) {
//                                 if (err) throw err;
//                             });

//                             resolve(result);
//                         } else {
//                             reject('err');
//                         }
//                     }).catch((err) => {
//                         reject(err);
//                     })
//                 })
//             })
//         } else {
//             return 1;
//         }

//     }
//     // Port number
// }).listen(5000);
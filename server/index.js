import fs from 'fs';
import express from 'express'
import cors from 'cors';
import multer from 'multer';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('images'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


app.get('/', (req, res) => {
    res.send({
        message: 'Hello there human! 💕😽🐶'
    })
});

app.post('/images', upload.single('image'), (req, res) => {

    try {

        res.status(201).json({
            message: 'Testing',
            imageName: req.file.filename
        });
    } catch(err) {

        res.status(500).send({
            message: `There was an error ${err}`
        })
    }
})

app.get('/api/image/:imageName', (req, res) => {

    try {
        const imageName = req.params.imageName;
        
        const readStream = fs.createReadStream(`images/${imageName}`)
        readStream.pipe(res);
    } catch(err) {
        res.status(500).send({
            messsage: `There was an error ${err}`
        })
    }
 
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})

import path from 'path'
import express from 'express'
import { routes } from './routes.js';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/')
        },
        filename: (req, file, cb) => {
            const unique = Date.now();
            cb(null, `${file.fieldname}_${unique}_${file.originalname.slice(file.originalname.length-5)}`);
        }
    })
});



const port = 8080;
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));
app.use('/uploads', express.static(path.resolve('uploads')));

app.use((req, res, next) => {
    const cookies = req.headers.cookie;
    if(cookies){
        req.cookies = cookies.split(';').reduce((r, c) => {
            const n = c.split('=');
            r[n[0].trim()] = n[1].trim();
            return r;
        }, {});
    }
    next();
});
routes(app, upload);


app.listen(port,()=>{
    console.log("ready!!!")
}); 
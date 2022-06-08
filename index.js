import path from 'path'
import express from 'express'
import { pbkdf2Sync, randomBytes } from 'crypto';
import { routes } from './routes.js';



const port = 8080;
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));

routes(app);


app.listen(port,()=>{
    console.log("ready!!!")
}); 
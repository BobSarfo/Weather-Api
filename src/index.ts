import express from 'express';
require('dotenv').config();
//import "reflect-metadata"
import { dbContext } from "./data-source"
import { User } from "./entity/User"
import * as bodyParser from "body-parser"; 
import { IncidentsController } from './controllers/IncidentsController';


dbContext.initialize().then(async () => {

    const app = express();
    app.use(bodyParser.json()); 

      // register express routes from defined application routes

    console.log("starting application...")

    const port = process.env.PORT || 3000;

    app.use("/", new IncidentsController().router);
    app.get('/health', (req, res) => {
        res.send('active');
    });

    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });




}).catch(error => console.log(error))

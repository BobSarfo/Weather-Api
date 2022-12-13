import express from 'express';
//import "reflect-metadata"
import { dbContext } from "./data-source"
import { User } from "./entity/User"
import * as bodyParser from "body-parser"; 
import { IncidentsController } from './controllers/IncidentsController';


dbContext.initialize().then(async () => {

    const app = express();
    app.use(bodyParser.json()); 

      // register express routes from defined application routes
      
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await dbContext.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await dbContext.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("starting application...")

    const port = 3000;

    app.use("/", new IncidentsController().router);
    app.get('/health', (req, res) => {
        res.send('active');
    });

    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });




}).catch(error => console.log(error))

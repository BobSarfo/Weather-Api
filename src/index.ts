import express from 'express';
import "reflect-metadata"
import { dbContext } from "./data-source"
import { User } from "./entity/User"
import { IWeatherRequest } from './models/IWeatherRequest';

dbContext.initialize().then(async () => {

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

    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/incidents', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/incident', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });




}).catch(error => console.log(error))

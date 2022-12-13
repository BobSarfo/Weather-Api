import { Request, Response, Router } from "express";
import { Incident } from "../entity/Incident";
import { dbContext } from "../data-source";
import { IWeatherRequest } from "../models/IWeatherRequest";
import { GetWeatherData, weatherDataToIncident } from "../services/incident_service";


export class IncidentsController {
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get('/incidents', this.all);
    this.router.post('/incident', this.save);
  }

  async all(request: Request, response: Response) {
    response.status(200).send(await dbContext.getRepository(Incident).find());
 }

  async save(request: Request<IWeatherRequest>, response: Response) {
    let weatherData = await GetWeatherData(request.body);
    let result = weatherDataToIncident(request.body, weatherData);
    let res = await dbContext.getRepository(Incident).save(result);
    if (res===undefined) {
      response.status(500).send("An error occurred. please try again later")      
    }
    response.status(201).send(true)
  }
}
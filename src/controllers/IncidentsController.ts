import { Request, Response, Router } from "express";
import { Incident } from "../entity/Incident";
import { dbContext } from "../data-source";
import { IWeatherRequest } from "../models/IWeatherRequest";
import { GetWeatherData, weatherDataToIncident } from "../services/incident_service";
import { Country_Codes } from "../services/country_codes";


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
    let countryRequest = request.body.country.toUpperCase();
    if(!(countryRequest in Country_Codes)){
      response.status(400).send("invalid country input. please check and try again later")      
    }
    
    let country_code = Country_Codes[countryRequest];

    let weatherData = await GetWeatherData(request.body, country_code);
    let result = weatherDataToIncident(request.body, weatherData);
    let res = await dbContext.getRepository(Incident).save(result);
    if (res===undefined) {
      response.status(500).send("An error occurred. please try again later")      
    }
    response.status(201).send(true)
  }
}
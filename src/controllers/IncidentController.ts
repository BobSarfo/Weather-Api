import {getRepository} from "typeorm"; 
import {NextFunction, Request, Response} from "express"; 
import {Incident} from "../entity/Incident"; 
import { dbContext } from "../data-source";
import { IWeatherRequest } from "../models/IWeatherRequest";
import { GetWeatherData, weatherDataToIncident } from "../services/incident_service";


class IncidentController {
    private incidentRepository = dbContext.getRepository(Incident); 
   
    async all(request: Request, response: Response, next: NextFunction) { 
       return this.incidentRepository.find(); 
    } 

    async save(request: Request<IWeatherRequest>, response: Response, next: NextFunction) { 
        let weatherData = await GetWeatherData(request.body);
        let result =  weatherDataToIncident(request.body,weatherData);
        
        return this.incidentRepository.save(result); 
     } 
}
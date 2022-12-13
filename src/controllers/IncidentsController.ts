import {Request, Response, Router} from "express"; 
import {Incident} from "../entity/Incident"; 
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
    private incidentRepository = dbContext.getRepository(Incident); 
   
    async all(request: Request, response: Response) { 
       return this.incidentRepository.find(); 
    } 

    async save(request: Request<IWeatherRequest>, response: Response) { 
        let weatherData = await GetWeatherData(request.body);
        let result =  weatherDataToIncident(request.body,weatherData);
        return this.incidentRepository.save(request.body); 
     } 
}


// router.get("/", async function (request: Request, response: Response, next: NextFunction) {

//     response.status(200).send(await dbContext.getRepository(Incident).find());

// });

// // About page route.
// router.post("/", async function (request: Request<IWeatherRequest>, response: Response, next: NextFunction) {
//     let weatherData = await GetWeatherData(request.body);
//     let result = WeatherDataToIncident(request.body, weatherData);

//     this.incidentRepository.save(result);
//     response.status(201).send(true)
// });

// module.exports = router;

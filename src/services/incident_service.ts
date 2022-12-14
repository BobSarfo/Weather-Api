import { dbContext } from "../data-source";
import { Incident } from "../entity/Incident";
import { IWeathApiResponse } from "../models/IWeatherApiReponse";
import { IWeatherRequest } from "../models/IWeatherRequest";
import { Country_Codes } from "./country_codes";
import { GetWeatherDataFromAPI } from "./weather-client";

export async function GetWeatherData(req: IWeatherRequest, country_code:string): Promise<IWeathApiResponse> {
    try {
            
        let response = await GetWeatherDataFromAPI(req.city, country_code);
        return response.data;
    } catch (error) {
        console.warn("error occurred with http client call: " + error)
        return undefined;
    }
}

export function weatherDataToIncident(apiRequest: IWeatherRequest, weatherApiResponse: IWeathApiResponse):Incident {

    let result =  new Incident();
    result.city = apiRequest.city;
    result.client_id = apiRequest.client_id;
    result.country= apiRequest.country;
    result.incident_desc = apiRequest.incident_desc;
    result.weather_report=weatherApiResponse;

   return result;
}
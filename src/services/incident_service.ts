import { IWeathApiResponse } from "../models/IWeatherApiReponse";
import { IWeatherRequest } from "../models/IWeatherRequest";
import { GetWeatherDataFromAPI } from "./weather-client";

async function GetWeatherData(req:IWeatherRequest):Promise<IWeathApiResponse> {
    try {
        let response = await GetWeatherDataFromAPI(req.city,req.country);
        return response.data;
    } catch (error) {
        console.warn("error occurred with http client call: "+ error)
    }
}
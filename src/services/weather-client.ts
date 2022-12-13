import axios from "axios";
import { IWeathApiResponse } from "../models/IWeatherApiReponse";
const API_KEY = process.env.API_KEY;


export const GetWeatherDataFromAPI = (city_name:string,country_code:string) => {
    
    const GET_WEATHERDATE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name},${country_code}&appid=${API_KEY}`
    return axios.get<IWeathApiResponse>(GET_WEATHERDATE_URL);    
}
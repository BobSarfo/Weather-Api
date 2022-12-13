export interface IWeatherResponse {
    client_id: number,
    incident_desc: string,
    city: string,
    country: string
    date: Date|string,
    weather_report: object 
}

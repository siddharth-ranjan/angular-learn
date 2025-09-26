import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  readonly weatherData = signal<any | null>(null);

  private readonly apiKey = environment.weatherApi.apiKey;
  private readonly baseUrl = environment.weatherApi.baseUrl;

  getWeather(location: string): Observable<any> {
    const url = `${this.baseUrl}${location}?unitGroup=metric&include=days&key=${this.apiKey}&contentType=json`;

    // console.log("Requesting url: " + url);
    return this.http.get(url);
  }

  setWeather(data:any){
    this.weatherData.set(data);
  }
}

import {Injectable} from '@angular/core';
import {WeatherService} from './weather.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(private weatherService: WeatherService) {}

  getWeather(location: string): Observable<any> {
    return this.weatherService.getWeather(location);
  }

}

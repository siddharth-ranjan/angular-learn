import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WeatherService} from '../../services/weather.service';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  protected readonly location = signal('');

  constructor(private weatherService: WeatherService) {}

  search():void {
    console.log(this.location() + " entered!");
    this.weatherService.getWeather(this.location())
      .subscribe({
        next: (data: any) => {
          console.log("weather data received \n" + data);
          this.weatherService.setWeather(data);
        },
        error: (err: any) => {
          console.error("error fetching data \n" + err);
          this.weatherService.setWeather(null);
        }
      })
    ;
  }
}

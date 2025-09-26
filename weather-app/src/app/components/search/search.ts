import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WeatherService} from '../../services/weather.service';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  protected readonly location = signal('');

  constructor(private searchService: SearchService) {}

  search():void {
    console.log(this.location() + " entered!");
    this.searchService.getWeather(this.location())
      .subscribe({
        next: (data: any) => {
          console.log("weather data received \n" + data);
        },
        error: (err: any) => {
          console.error("error fetching data \n" + err);
        }
      })
    ;
  }
}

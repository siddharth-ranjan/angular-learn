import { Component } from '@angular/core';
import {Search} from '../search/search';
import {WeatherDisplay} from '../weather-display/weather-display';

@Component({
  selector: 'app-weather-page',
  imports: [Search, WeatherDisplay],
  templateUrl: './weather-page.html',
  styleUrl: './weather-page.css'
})
export class WeatherPage {

}

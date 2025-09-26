import {Component, inject} from '@angular/core';
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: 'app-weather-display',
  imports: [],
  templateUrl: './weather-display.html',
  styleUrl: './weather-display.css'
})
export class WeatherDisplay {
  protected readonly weatherService = inject(WeatherService);
}

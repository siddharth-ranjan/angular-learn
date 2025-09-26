import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Grocery} from './types/grocery.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styles: []
})
export class App {
}

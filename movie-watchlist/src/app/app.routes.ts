import { Routes } from '@angular/router';
import {MovieSearch} from './components/movie-search/movie-search';
import {MovieDetail} from './components/movie-detail/movie-detail';
import {Watchlist} from './components/watchlist/watchlist';

export const routes: Routes = [
  {path: '', component: MovieSearch},
  {path: 'movie/:id', component: MovieDetail},
  {path: 'watchlist', component: Watchlist}
];

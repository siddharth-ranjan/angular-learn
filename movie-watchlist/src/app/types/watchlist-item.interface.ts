import {MovieDetails} from './movie-details.interface';

export interface WatchlistItem {
  [id : string]: MovieDetails;
}

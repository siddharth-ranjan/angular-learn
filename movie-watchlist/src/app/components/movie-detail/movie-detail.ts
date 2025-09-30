import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {WatchlistItem} from '../../types/watchlist-item.interface';
import {WatchlistService} from '../../services/watchlist.service';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(SearchService);
  private watchlistService = inject(WatchlistService);

  movie = signal<any | null>(null)
  isInWatchlist = signal(false);
  private readonly note = signal<string>('');

  ngOnInit(): void {
    const navigationState = history.state;
    const movieId = this.route.snapshot.paramMap.get('id');

    if (navigationState && navigationState['movie']) {
      console.log('Received movie data from state.')
      console.log(navigationState['movie']);
      this.movie.set(navigationState['movie']);
      this.checkWatchlistStatus(movieId);
    } else {
      console.log("No state found, fetching again from API...");

      if (movieId) {
        this.movieService.searchMovieById(movieId).subscribe(data => {
          this.movie.set(data);
          this.checkWatchlistStatus(movieId);
        })
      }
    }
  }

  private checkWatchlistStatus(movieId: string | null): void {
    if (!movieId) return;
    const watchlistJSON = this.watchlistService.watchlistJSON;

    this.isInWatchlist.set(watchlistJSON.some(item => movieId in item));
  }

  toggleWatchlistStatus() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId) return;

    const watchlistJSON = this.watchlistService.watchlistJSON;

    const movieJSON: WatchlistItem = {
      [movieId]: {
        title: this.movie()['Title'],
        year: this.movie()['Year'],
        poster: this.movie()['Poster'],
        note: this.note()
      }
    };

    console.log(movieJSON);

    const movieIndex = watchlistJSON.findIndex(item => movieId in item);

    if(movieIndex >= 0) {
      this.watchlistService.removeFromWatchlist(movieIndex);
      this.isInWatchlist.set(false);
      console.log(`Removed ${movieId} from watchlist.`);
    } else {
      this.watchlistService.addToWatchlist(movieJSON);
      this.isInWatchlist.set(true);
      console.log(`Added ${movieId} to watchlist.`);
    }

  }
}

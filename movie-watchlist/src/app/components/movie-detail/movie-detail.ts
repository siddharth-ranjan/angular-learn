import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(SearchService);
  movie = signal<any | null>(null)
  isInWatchlist = signal(false);
  private readonly note = signal<string>('');

  ngOnInit(): void {
    const navigationState = history.state;
    const movieId = this.route.snapshot.paramMap.get('id');

    if(navigationState && navigationState['movie']) {
      console.log('Received movie data from state.')
      console.log(navigationState['movie']);
      this.movie.set(navigationState['movie']);
      this.checkWatchlistStatus(movieId);
    } else {
      console.log("No state found, fetching again from API...");

      if(movieId){
        this.movieService.searchMovieById(movieId).subscribe(data => {
          this.movie.set(data);
          this.checkWatchlistStatus(movieId);
        })
      }
    }
  }

  private checkWatchlistStatus(movieId: string | null): void {
    if (!movieId) return;
    const watchlistJSON = localStorage.getItem('watchlist');
    const watchlist: string[] = watchlistJSON ? JSON.parse(watchlistJSON) : [];
    this.isInWatchlist.set(watchlist.includes(movieId));
  }

  toggleWatchlistStatus() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId) return;

    const watchlistJSON = localStorage.getItem('watchlist');
    let watchlist: string[] = watchlistJSON ? JSON.parse(watchlistJSON) : [];

    const movieIndex = watchlist.indexOf(movieId);

    if (movieIndex > -1) {
      // If the movie is in the list, remove it
      watchlist.splice(movieIndex, 1);
      this.isInWatchlist.set(false);
      console.log(`Removed ${movieId} from watchlist.`);
    } else {
      // If the movie is not in the list, add it
      watchlist.push(movieId);
      this.isInWatchlist.set(true);
      console.log(`Added ${movieId} to watchlist.`);
    }

    // Save the updated array back to localStorage
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
}

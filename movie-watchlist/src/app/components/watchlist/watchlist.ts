import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WatchlistService} from '../../services/watchlist.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css'
})
export class Watchlist implements OnInit {
  private router: Router = inject(Router);
  private watchlistService: WatchlistService = inject(WatchlistService);
  watchlistData = signal<any[]>([])
  protected isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const watchlistJSON = localStorage.getItem("watchlist");
    const movieIds: string[] = watchlistJSON ? JSON.parse(watchlistJSON) : [];

    if (movieIds.length > 0) {
      this.watchlistService.prepareWatchlist(movieIds).subscribe({
        next: (movies: any) => {
          this.watchlistData.set(movies);
          this.isLoading.set(false);
          console.log('Fetched movies:', this.watchlistData());
        },
        error: (err: any) => {
          console.error("Error fetching watchlist details:", err);
          this.isLoading.set(false);
        }
      });
    } else {
      console.log('Nothing in watchlist.');
      this.isLoading.set(false);
    }

  }

  navigateToMovie(id: string) {
    this.router.navigate(['/movie', id], {
      state: {movie: this.watchlistData().filter(item => item.imdbID == id)[0]},
    })
      .then(navigated => {
        if (navigated) {
          console.log('Navigation was successful!');
        } else {
          console.log('Navigation has been blocked by a guard.');
        }
      });
  }

}

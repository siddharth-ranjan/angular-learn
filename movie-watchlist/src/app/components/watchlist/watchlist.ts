import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {WatchlistItem} from '../../types/watchlist-item.interface';
import {WatchlistService} from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css'
})
export class Watchlist implements OnInit {
  private router: Router = inject(Router);
  private watchlistService = inject(WatchlistService);

  private watchlistData = signal<WatchlistItem[]>([]);
  protected isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const watchlistJSON = this.watchlistService.watchlistJSON;

    this.watchlistData.set(watchlistJSON);
    if(watchlistJSON && watchlistJSON.length > 0) {
      this.isLoading.set(false);
      console.log("Fetched watchlist from local storage");
      console.log(this.watchlistData())
    } else {
      this.isLoading.set(true);
      console.log("No watchlist in local storage");
    }
  }

  displayWatchlist = computed(() => {
    const currentWatchlist = this.watchlistData();

    return currentWatchlist.map(item => {
      const id = Object.keys(item)[0];
      const details = item[id];

      return { id, ...details };
    });
  });

  navigateToMovie(id: string) {
    this.router.navigate(['/movie', id])
      .then(navigated => {
        if (navigated) {
          console.log('Navigation was successful!');
        } else {
          console.log('Navigation has been blocked by a guard.');
        }
      });
  }

}

import {Injectable} from '@angular/core';
import {WatchlistItem} from '../types/watchlist-item.interface';

@Injectable({
  providedIn: 'root'
})

export class WatchlistService {

  addToWatchlist(watchlist: WatchlistItem) {
    const watchlistJSON = this.watchlistJSON;
    watchlistJSON.push(watchlist);
    this.watchlist(watchlistJSON);
  }

  removeFromWatchlist(movieIndex: number) {
    const watchlistJSON = this.watchlistJSON;
    watchlistJSON.splice(movieIndex, 1);
    this.watchlist(watchlistJSON);
  }

  get watchlistJSON(): WatchlistItem[] {
    const watchlist = localStorage.getItem("watchlist");
    return watchlist ? JSON.parse(watchlist) : [];
  }

  watchlist(watchlist: WatchlistItem[]) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

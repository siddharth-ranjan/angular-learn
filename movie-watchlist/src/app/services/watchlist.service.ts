import {inject, Injectable} from '@angular/core';
import {SearchService} from './search.service';
import {forkJoin, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WatchlistService {
  private searchService: SearchService = inject(SearchService);

  prepareWatchlist(ids: string[]): any {
    if (!ids || ids.length === 0) {
      return of([]);
    }

    const movieRequests = ids.map(id => this.searchService.searchMovieById(id));

    return forkJoin(movieRequests);
  }
}

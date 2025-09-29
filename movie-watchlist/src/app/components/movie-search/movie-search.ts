import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-search',
  imports: [FormsModule],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.css'
})
export class MovieSearch {
  protected readonly title = signal('Dune');
  protected readonly year = signal<number>(2021);
  protected readonly movieId = signal('tt3896198');
  protected readonly searchMode = signal<'id' | 'title'>('title');

  constructor(private searchService: SearchService, private router: Router) { }

  searchById() {
    const movieId = this.movieId().trim();

    this.searchService.searchMovieById(movieId)
      .subscribe({
        next: (data:any) => {
          console.log(data);

          if(data && data.imdbID) {
            this.router.navigate(['/movie', data.imdbID], {
              state: {movie: data}
            })
              .then(navigated => {
                if (navigated) {
                  console.log('Navigation was successful!');
                } else {
                  console.log('Navigation has been blocked by a guard.');
                }
              });
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  searchByTitle() {
    const movieName = this.title().trim();
    const year = this.year();

    if(movieName && year && year > 1900 && year < new Date().getFullYear()){
      this.searchService.searchMovieByTitle(movieName, year)
        .subscribe({
          next: (data:any) => {
            console.log(data);
            if(data && data.imdbID) {
              this.router.navigate(['/movie', data.imdbID], {
                state: {movie: data}
              })
                .then(navigated => {
                  if (navigated) {
                    console.log('Navigation was successful!');
                  } else {
                    console.log('Navigation has been blocked by a guard.');
                  }
                });
            } else{
              console.log('No movie found for the title and year.');
            }
          },
          error: (err) => {
            console.error(err);
          }
        });
    }
  }

  get currentYear(){
    return new Date().getFullYear();
  }

  setSearchMode(mode: 'id' | 'title') {
    this.searchMode.set(mode);
  }
}

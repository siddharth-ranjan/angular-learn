import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../.envs/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(private http: HttpClient) { }
  private readonly baseUrl = environment.movieApi.baseUrl;
  private readonly apiKey = environment.movieApi.apiKey;

  searchMovieByTitle(title: string, year: number) {
    const url = `${this.baseUrl}?t=${title.replace(' ', '+')}&y=${year}&apikey=${this.apiKey}`;

    return this.http.get(url);
  }

  searchMovieById(id: string) {
    const url = `${this.baseUrl}?i=${id}&apikey=${this.apiKey}`;

    return this.http.get(url);
  }
}

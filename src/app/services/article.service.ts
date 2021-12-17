import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../models/articlePg';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}
  public loading: boolean = true;
  private apiUrl: string = 'https://localhost:44351/api/Articles';
  getArticles(page: number, pageSize: Number) {
    let url: string = this.apiUrl + '/' + page + '/' + pageSize;
    return this.httpClient.get<ArticlePg>(url).pipe(tap(x=>{this.loading=false}));
  }
}

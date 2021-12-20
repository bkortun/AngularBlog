import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../models/articlePg';
import { tap } from 'rxjs/operators';
import { Article } from '../models/article';

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
  getArticle(id:number){
    let url: string = this.apiUrl + '/' + id;
    return this.httpClient.get<Article>(url).pipe(tap(x=>{this.loading=false}));
  }
}

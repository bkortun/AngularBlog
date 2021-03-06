import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../models/articlePg';
import { tap } from 'rxjs/operators';
import { Article } from '../models/article';
import { Archive } from '../models/archive';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}
  public loading: boolean = true;
  //https://localhost:44351/api/Articles
  private apiUrl: string = 'https://localhost:44368/api/Articles';
  getArticles(page: number, pageSize: Number) {
    let url: string = this.apiUrl + '/' + page + '/' + pageSize;
    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  getArticle(id: number) {
    let url: string = this.apiUrl + '/' + id;
    return this.httpClient.get<Article>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  getSearchArticles(searchText: string, page: number, pageSize: number) {
    let url: string =
      this.apiUrl +
      '/' +
      'SearchArticles' +
      '/' +
      searchText +
      '/' +
      page +
      '/' +
      pageSize;
    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  getArticleWithCategory(id: number, page: number, pageSize: Number) {
    let url: string =
      this.apiUrl +
      '/' +
      'GetArticleWithCategory' +
      '/' +
      id +
      '/' +
      page +
      '/' +
      pageSize;
    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  getArticlesByMostView() {
    let url: string = this.apiUrl + '/' + 'GetArticlesByMostView';
    return this.httpClient.get<Article[]>(url);
  }
  getArticlesArchive() {
    let url: string = this.apiUrl + '/' + 'GetArticlesArchive';
    return this.httpClient.get<Archive[]>(url);
  }
  getArticleArchiveList(
    year: number,
    month: number,
    page: number,
    pageSize: number
  ) {
    let url: string =
      this.apiUrl +
      '/' +
      'GetArticleArchiveList' +
      '/' +
      year +
      '/' +
      month +
      '/' +
      page +
      '/' +
      pageSize;
    return this.httpClient.get<ArticlePg>(url).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  articleViewCountUp(id: number) {
    let url: string = this.apiUrl + '/' + 'ArticleViewCountUp' + '/' + id;
    return this.httpClient.get(url);
  }

  getArticlesWithoutPg() {
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  saveArticlePicture(image: any) {
    let url: string = this.apiUrl + '/' + 'SaveArticlePicture';
    return this.httpClient.post<any>(url,image);
  }

  addArticle(article:Article){
    return this.httpClient.post(this.apiUrl,article);
  }
  updateArticle(id:number,article:Article){
    let url:string=this.apiUrl+"/"+id;
    return this.httpClient.put(url,article);
  }
  deleteArticle(id:number){
    let url:string=this.apiUrl+"/"+id;
    return this.httpClient.delete(url);
  }
}

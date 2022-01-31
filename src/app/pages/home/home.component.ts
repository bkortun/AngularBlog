import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnDestroy{
  page: number = 1;
  articles: Article[];
  totalCount: number;
  pageSize: number = 5;
  loadingItem: number = 5;
  ajax:any;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    if (this.ajax!=null) {
      this.ajax.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parms) => {
      if (parms.get('page')) {
        this.page = Number(parms.get('page'));
      }
      if (this.totalCount > 0) {
        if (this.totalCount >= this.page * this.pageSize) {
          this.loadingItem = 5;
        } else {
          this.loadingItem = this.totalCount - (this.page - 1) * this.pageSize;
        }
      }
      this.articles = [];
      this.totalCount = 0;
      this.ajax=this.articleService
        .getArticles(this.page, this.pageSize)
        .subscribe((response) => {
          this.articles = response.articles;
          this.totalCount = response.totalCount;
        });
    });
  }
}

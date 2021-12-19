import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  page: number = 1;
  articles: Article[];
  totalCount: number;
  pageSize: number = 5;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parms) => {
      if (parms.get('page')) {
        this.page = Number(parms.get('page'));
      }
      this.articles = [];
      this.totalCount = 0;
      this.articleService
        .getArticles(this.page, this.pageSize)
        .subscribe((response) => {
          console.log(response)
          this.articles = response.articles;
        });
    });
  }
}

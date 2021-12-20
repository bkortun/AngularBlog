import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Category } from 'src/app/models/category';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  category: Category;

  constructor(
    private activatedRoute: ActivatedRoute,
    public articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.articleService.loading = true;
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.articleService.getArticle(id).subscribe((response) => {
        this.article = response;
        this.category = response.category;
      });
    });
  }
}

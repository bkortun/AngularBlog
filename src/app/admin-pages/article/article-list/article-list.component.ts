import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Article } from 'src/app/models/article';
import { DataSource } from '@angular/cdk/collections';
import { ArticleService } from 'src/app/services/article.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  displayedColumns: string[] = [
    'picture',
    'title',
    'category',
    'publishDate',
    'viewCount',
    'commentCount',
  ];
  articles: Article[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticlesWithoutPg().subscribe((response) => {
      (this.articles = response),
        (this.dataSource = new MatTableDataSource<Article>(response)),
        (this.dataSource.paginator = this.paginator);
    });
  }
}

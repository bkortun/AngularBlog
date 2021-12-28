import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styleUrls: ['./searchs.component.css']
})
export class SearchsComponent implements OnInit {
  page: number = 1;
  articles: Article[] = [];
  totalCount: number;
  pageSize: number = 5;
  loadingItem: number = 5;
  ajax: any;
  searchText: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
this.activatedRoute.url.subscribe(params=>{
  if (this.ajax!=null) {
    this.ajax.unsubscribe();
  }
  this.articles=[];
  this.totalCount=0;
  this.articleService.loading=true;
  if (this.activatedRoute.snapshot.paramMap.get("page")) {
    this.page=Number(this.activatedRoute.snapshot.paramMap.get("page"));
  }
  this.searchText=this.activatedRoute.snapshot.queryParamMap.get("s");
  this.ajax= this.articleService.getSearchArticles(this.searchText,this.page,this.pageSize).subscribe(response=>{
    this.articles=response.articles;
    this.totalCount=response.totalCount;
  })
})
  }

}

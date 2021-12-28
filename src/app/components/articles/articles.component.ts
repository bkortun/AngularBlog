import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  @Input() page: number;
  @Input() articles: Article[];
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Input() loadingItem: number;
  @Input() typeList: string;
  defaultArticle: string = 'assets/article_empty.png';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleService.loading = true;
  }

  createRange() {
    var items: Number[] = [];
    for (let index = 1; index <= this.loadingItem; index++) {
      items.push(index);
    }
    return items;
  }

  pageChange(event: number) {
    this.articleService.loading = true;
    this.page = event;
    switch (this.typeList) {
      case 'home':
        this.router.navigateByUrl('/sayfa/' + this.page);
        break;
      case 'category':
        let categoryName=this.activatedRoute.snapshot.paramMap.get("name")
        let categoryId=this.activatedRoute.snapshot.paramMap.get("id")
        this.router.navigateByUrl('/kategori/'+categoryName+'/'+categoryId+'/sayfa/'+this.page)
        break;
        case 'search':
        let searchText=this.activatedRoute.snapshot.queryParamMap.get("s")
        this.router.navigateByUrl('/arama/sayfa/'+this.page+'?s='+searchText)
        break;

      default:
        break;
    }
  }
}

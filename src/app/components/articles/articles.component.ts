import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() page: number;
  @Input() articles: Article[];
  @Input() totalCount: number;
  @Input() pageSize: number;
  defaultArticle:string="assets/article_empty.png"

  constructor(private router:Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
  }



  pageChange(event:number){
    this.page=event;
    this.router.navigateByUrl("/sayfa/"+this.page);
  }

}

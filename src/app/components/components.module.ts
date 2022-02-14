import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ArticlesComponent } from './articles/articles.component';
import { UrlFormatPipe } from '../pipes/url-format.pipe';
import { MenuArticleMostViewComponent } from './menu-article-most-view/menu-article-most-view.component';
import { MenuArchiveComponent } from './menu-archive/menu-archive.component';
import { AddCommentComponent } from './add-comment/add-comment.component';


@NgModule({
  declarations: [MenuCategoryComponent, PageTitleComponent, ArticlesComponent,UrlFormatPipe, MenuArticleMostViewComponent, MenuArchiveComponent, AddCommentComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports:[
    MenuCategoryComponent,
    PageTitleComponent,
    ArticlesComponent,
    UrlFormatPipe,
    MenuArticleMostViewComponent,
    MenuArchiveComponent
  ]
})
export class ComponentsModule { }

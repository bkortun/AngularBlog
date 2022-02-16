import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../modules/material/material.module';

import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ArticlesComponent } from './articles/articles.component';
import { UrlFormatPipe } from '../pipes/url-format.pipe';
import { MenuArticleMostViewComponent } from './menu-article-most-view/menu-article-most-view.component';
import { MenuArchiveComponent } from './menu-archive/menu-archive.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { ListCommentComponent } from './list-comment/list-comment.component';


@NgModule({
  declarations: [MenuCategoryComponent, PageTitleComponent, ArticlesComponent,UrlFormatPipe, MenuArticleMostViewComponent, MenuArchiveComponent, AddCommentComponent, ListCommentComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    MaterialModule,
  ],
  exports:[
    MenuCategoryComponent,
    PageTitleComponent,
    ArticlesComponent,
    UrlFormatPipe,
    MenuArticleMostViewComponent,
    MenuArchiveComponent,
    AddCommentComponent,
    ListCommentComponent
  ]
})
export class ComponentsModule { }

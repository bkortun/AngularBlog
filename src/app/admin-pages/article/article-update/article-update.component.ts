import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import {
  FormGroup,
  FormControl,
  Validator,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MyValidationService } from 'src/app/services/my-validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import * as DecoupledDocument from '@ckeditor/ckeditor5-build-decoupled-document'
@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {
  public Editor=DecoupledDocument;
  fileData: File = null;
  picture: string = null;
  defaultArticle: string = 'assets/article_empty.png';
  articleForm: FormGroup;
  success: boolean;
  loading: boolean;
  info: string;
  categories: Category[];
  articleId:number;
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    public myValidationService: MyValidationService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.articleId=Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.articleService.getArticle(this.articleId).subscribe(response=>{
      this.picture=response.picture;
      this.articleForm.controls['title'].setValue(response.title);
      this.articleForm.controls['contentSummary'].setValue(response.contentSummary);
      this.articleForm.controls['contentMain'].setValue(response.contentMain);
      this.articleForm.controls['category'].setValue(response.category);
    });



    this.articleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      contentSummary: new FormControl('', Validators.required),
      contentMain: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      picture: new FormControl(''),
    });
  }

  get getControls() {
    return this.articleForm.controls;
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

  onSubmit() {
    if (this.articleForm.valid) {
      this.loading = true;
      this.articleService.updateArticle(this.articleId,this.articleForm.value).subscribe(
        (response) => {
          console.log('eklendi');
          this.success = true;
          this.router.navigateByUrl("/admin/makale/liste");
        },
        (error) => {
          this.success = false;
          this.info = 'Bir hata meydana geldi, sayfayı yenileyin.';
          console.log(error);
        }
      );
    }
  }

  displayCategoryName(category: Category) {
    return category.name;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  upload(files: any) {
    this.fileData = files.target.files[0];

    let formData = new FormData();

    formData.append('picture', this.fileData);

    this.articleService.saveArticlePicture(formData).subscribe((result) => {
      console.log(result.path);
      this.picture = result.path;
      this.articleForm.controls['picture'].setValue(this.picture);
    });
  }

}

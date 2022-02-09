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
import { Category } from 'src/app/models/category';
import { MyValidationService } from 'src/app/services/my-validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
})
export class ArticleAddComponent implements OnInit {
  fileData: File = null;
  picture: string = null;
  defaultArticle: string = 'assets/article_empty.png';
  articleForm: FormGroup;
  success: boolean;
  loading: boolean;
  info: string;
  categories: Category[];
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    public myValidationService: MyValidationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.articleForm = new FormGroup({
      title: new FormControl('makale1', Validators.required),
      contentSummary: new FormControl('makaleözeti1', Validators.required),
      contentMain: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      picture: new FormControl(''),
    });
  }

  get getControls() {
    return this.articleForm.controls;
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.loading = true;
      this.articleService.addArticle(this.articleForm.value).subscribe(
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

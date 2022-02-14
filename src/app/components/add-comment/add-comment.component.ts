import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { MyValidationService } from 'src/app/services/my-validation.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  constructor(private commentService:CommentService, private activatedRoute:ActivatedRoute, public myValidation:MyValidationService) { }

  commentForm:FormGroup;
  success:boolean;
  info:string;

  ngOnInit(): void {
    this.commentForm=new FormGroup({
      name: new FormControl("",Validators.required),
      contentMain: new FormControl("",Validators.required),
      articleId:new FormControl("")
    });

  }
onSubmit(){
  if (this.commentForm.valid) {
    let id=Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.commentForm.value.articleId.setValue(id);  //!!!!!!!!!!!!!!!!!!!!!
    this.commentService.addComment(this.commentForm.value).subscribe(response=>{
      this.success=true
      this.info="Yorumunuz başarıyla eklendi."
    },error=>{
      this.success=false
      this.info="Bir hata meydana geldi."
    })
  }
}
}

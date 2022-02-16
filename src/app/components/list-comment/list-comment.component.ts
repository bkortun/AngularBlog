import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  constructor(private commentService:CommentService,private activatedRoute:ActivatedRoute) { }

  comments:Comment[]=[];
  loading:boolean;
  ngOnInit(): void {
    this.loading=true;
    let id= Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.commentService.commentList(id).subscribe(response=>{
this.comments=response;
this.loading=false;

    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiPath: string = 'https://localhost:44351/api/Comments';
  loading: boolean = false;
  constructor(private httpClient: HttpClient) {}

  addComment(comment: Comment) {
    this.loading=true
    return this.httpClient.post(this.apiPath, comment).pipe(
      tap((x) => {
        this.loading = false;
      })
    );
  }
  commentList(id:number){
    let url:string=this.apiPath+"/"+id;
    return this.httpClient.get<Comment[]>(url);
  }
}

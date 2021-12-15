import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath: string = 'https://localhost:44351/api/Categories';
  constructor(private httpClient:HttpClient) {}

  public getCategories(){
    return this.httpClient.get<Category[]>(this.apiPath);
  }
  public getCategoryById(id:number){
    let url:string= this.apiPath+'/'+id;
    return this.httpClient.get<Category>(url);
  }
}

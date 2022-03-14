import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  login(user:User){
    return this.httpClient.post<User>("https://localhost:44368/api/auth/login",user);
  }

}

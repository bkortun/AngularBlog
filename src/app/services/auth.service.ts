import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  isAuthenticated(email:string,password:string){
    let adminUser={email:email,password:password};
    return this.httpClient.post<any>("https://localhost:44351/api/Auth/IsAuthenticated",adminUser);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private httpClient:HttpClient) { }

  private apiUrl: string = 'https://localhost:44351/api/Helper';

  sendContactMail(contact:Contact){
    let url:string =this.apiUrl+"/"+"SendContactMail";
    return this.httpClient.post(url,contact);
  }
}

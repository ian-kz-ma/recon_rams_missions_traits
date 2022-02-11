import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public nonce: string = "";
  constructor(private http: HttpClient, private authService: AuthService) { }
  public async getUser(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.authService.token);
  }
  
}
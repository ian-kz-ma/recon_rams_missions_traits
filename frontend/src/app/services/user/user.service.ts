import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public nonce: string = "";
  constructor(private http: HttpClient) { }

  //sends  request to the api(if no user record, create user for wallet),then create randomized nonce string
  //for the session and save to user
  //encrypt the nonce string with the wallet key, and return user record
  sessionStart(pubKey: number) {

     this.http.post(`http://localhost:8080/api/userSign`, '=' + pubKey, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    }).subscribe( result => {
      //sign with metamask
      //nonce = result
      //nonce is passed with all user only requests. 
    });
  }
}
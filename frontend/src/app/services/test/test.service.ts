import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ITest } from '../../models/ITest';
import { AuthService } from '../auth/auth.service';
@Injectable({ providedIn: 'root' })
export class TestService {
  private testUrl = 'http://localhost:8080/api/test/';
  public test: ITest | undefined;

  constructor(private http: HttpClient, private authService: AuthService) { }


  getTest(id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    console.log(this.authService.token.token);
    headers = headers.append('Authorization', this.authService.token.token);
    return this.http.get<ITest>(`http://localhost:8080/api/test/${id}`, {headers: headers});
  }
}



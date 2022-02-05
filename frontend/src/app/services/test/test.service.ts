import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ITest } from '../../models/ITest';
@Injectable({ providedIn: 'root' })
export class TestService {
  private testUrl = 'http://localhost:8080/api/test/';
  public test: ITest | undefined;

  constructor(private http: HttpClient) { }


  getTest(id: number) {
    return this.http.get<ITest>(`http://localhost:8080/api/test/${id}`);
  }
}



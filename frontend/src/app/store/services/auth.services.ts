import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionData } from '../reducers/auth.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthServices {
  constructor(private http: HttpClient) {}

  baseUrl = environment.baseUrl;

  public loginRequest(
    email: string,
    password: string
  ): Observable<SessionData> {
    const url = this.baseUrl + '/user/login';
    const body = { email: email, password: password };

    return this.http.post<SessionData>(url, body);
  }
}

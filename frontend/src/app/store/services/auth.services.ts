import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionData, UserData } from '../reducers/auth.reducer';
import { Injectable } from '@angular/core';
import { jwtHeaders } from 'src/shared/enums/utils';

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

  public registerRequest(
    name: string,
    email: string,
    password: string,
    phone: string,
    country: string,
    city: string
  ): Observable<SessionData> {
    const url = this.baseUrl + '/user/register';
    const body = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      country: country,
      city: city,
    };

    return this.http.post<SessionData>(url, body);
  }

  public sessionToken(): Observable<SessionData> {
    const url = this.baseUrl + '/user/session';

    return this.http.get<SessionData>(url, { headers: jwtHeaders() });
  }
}

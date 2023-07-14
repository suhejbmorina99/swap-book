import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class BookServices {
  constructor(private http: HttpClient) {}

  baseUrl = environment.baseUrl;

  public bookRequest(
    title: string,
    isbn: string,
    language: string,
    condition: string
  ): Observable<any> {
    const url = this.baseUrl + '/book';
    const body = {
      title: title,
      isbn: isbn,
      language: language,
      condition: condition,
    };

    return this.http.post<any>(url, body);
  }

  //   public registerRequest(
  //     name: string,
  //     email: string,
  //     password: string,
  //     phone: string,
  //     country: string,
  //     city: string
  //   ): Observable<SessionData> {
  //     const url = this.baseUrl + '/user/register';
  //     const body = {
  //       name: name,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       country: country,
  //       city: city,
  //     };

  //     return this.http.post<SessionData>(url, body);
  //   }
}

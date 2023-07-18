import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class BookServices {
  constructor(private http: HttpClient) {}

  baseUrl = environment.baseUrl;

  public bookRequest(
    title: string,
    author: string,
    isbn: string,
    language: string,
    condition: string
  ): Observable<any> {
    const url = this.baseUrl + '/book';
    const body = {
      title: title,
      author: author,
      isbn: isbn,
      language: language,
      condition: condition,
    };

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(url, body, { headers: headers });
  }

  public getBooks(): Observable<any> {
    const url = this.baseUrl + '/book';
    return this.http.get<any>(url);
  }
}

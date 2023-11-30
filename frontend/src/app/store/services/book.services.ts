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
    condition: string,
    numberOfPages: number,
    category: string,
    publisher: string,
    user: { id: string },
  ): Observable<any> {
    const url = this.baseUrl + '/book';
    const body = {
      title: title,
      author: author,
      isbn: isbn,
      language: language,
      condition: condition,
      numberOfPages: numberOfPages,
      category: category,
      publisher: publisher,
      user: {
        id: user.id,
      },
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

  public updateUserBook(
    bookId?: string,
    title?: string,
    author?: string,
    isbn?: string,
    language?: string,
    condition?: string,
    numberOfPages?: number,
    category?: string,
    publisher?: string,
  ): Observable<any> {
    const url = `${this.baseUrl}/book/${bookId}`;
    const body = {
      title: title,
      author: author,
      isbn: isbn,
      language: language,
      condition: condition,
      numberOfPages: numberOfPages,
      category: category,
      publisher: publisher,
    };

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch<any>(url, body, { headers: headers });
  }

  public getBookId(bookId: string): Observable<any> {
    const url = `${this.baseUrl}/book/bookId/${bookId}`;
    return this.http.get<any>(url);
  }

  public getUserBooks(user: { id: string }): Observable<any> {
    const url = `${this.baseUrl}/book/${user.id}`;
    return this.http.get<any>(url);
  }

  public deleteUserBook(id: string): Observable<any> {
    const url = `${this.baseUrl}/book/${id}`;

    const token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(url, { headers: headers });
  }

  public getOtherBooks(user: { id: string }): Observable<any> {
    const url = `${this.baseUrl}/book/not-owned/${user.id}`;
    return this.http.get<any>(url);
  }

  public getOtherAuthors(user: { id: string }): Observable<any> {
    const url = `${this.baseUrl}/book/authors-except-me/${user.id}`;
    return this.http.get<any>(url);
  }

  public getFilterAuthor(author: string): Observable<any> {
    const url = `${this.baseUrl}/book/specific-author/${author}`;
    return this.http.get<any>(url);
  }
  public getCategories(): Observable<any> {
    const url = `${this.baseUrl}/book/categories/`;
    return this.http.get<any>(url);
  }
}

import { HttpHeaders } from '@angular/common/http';

export function jwtHeaders() {
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', localStorage.getItem('jwt') as string);
  return headers;
}

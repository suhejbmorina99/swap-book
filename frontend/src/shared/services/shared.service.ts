// filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private clearFilterSubject = new BehaviorSubject<boolean>(false);
  clearFilter$ = this.clearFilterSubject.asObservable();

  clearFilter() {
    this.clearFilterSubject.next(true);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-ready-for-swap',
  templateUrl: './ready-for-swap.component.html',
  styleUrls: ['./ready-for-swap.component.scss'],
})
export class ReadyForSwapComponent {
  public otherBooks: any[] = [];

  constructor(private bookService: BookServices, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService.getOtherBooks({ id: userId }).subscribe((data: any[]) => {
        this.otherBooks = data;
      });
    }
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-ready-for-swap',
  templateUrl: './ready-for-swap.component.html',
  styleUrls: ['./ready-for-swap.component.scss'],
})
export class ReadyForSwapComponent {
  @Input() specificAuthor = '';
  public otherBooks: any[] = [];
  public otherAuthors: any[] = [];
  public filteredAuthor: string = '';

  constructor(private bookService: BookServices, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService
        .getOtherBooks({ id: userId })
        .subscribe((data: any[]) => {
          this.otherBooks = data;
        });
    }
    if (this.specificAuthor) {
      this.bookService
        .getFilterAuthor({ author: this.specificAuthor })
        .subscribe((data: any[]) => {
          this.otherAuthors = data;
        });
    }
  }
}

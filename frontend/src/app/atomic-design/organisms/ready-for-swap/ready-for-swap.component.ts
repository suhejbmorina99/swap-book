import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-ready-for-swap',
  templateUrl: './ready-for-swap.component.html',
  styleUrls: ['./ready-for-swap.component.scss'],
})
export class ReadyForSwapComponent implements OnChanges {
  @Input() specificAuthor = '';
  @Input() specificCategory = '';
  public otherBooks: any[] = [];
  public otherAuthors: any[] = [];
  public specificCategories: any[] = [];

  constructor(
    private bookService: BookServices,
    private router: Router,
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService
        .getOtherBooks({ id: userId })
        .subscribe((data: any[]) => {
          this.otherBooks = data;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.specificAuthor) {
      this.bookService
        .getFilterAuthor(this.specificAuthor)
        .subscribe((data: any[]) => {
          this.otherAuthors = data;
        });
    } else {
      this.otherAuthors = [];
    }

    if (this.specificCategory) {
      this.bookService
        .getCategories(this.specificCategory)
        .subscribe((data: any[]) => {
          this.specificCategories = data;
        });
    } else {
      this.specificCategories = [];
    }
  }
}

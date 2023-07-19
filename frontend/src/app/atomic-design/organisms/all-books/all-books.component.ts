import { Component, EventEmitter, Output } from '@angular/core';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
})
export class AllBooksComponent {
  public allBooks: any[] = [];
  @Output() redirectToSwap = new EventEmitter<boolean>();

  constructor(private bookService: BookServices) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data: any[]) => {
      this.allBooks = data;
      if (this.allBooks.length > 0) {
        this.redirectToSwap.emit(true);
      }
    });
  }
}

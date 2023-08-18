import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
})
export class AllBooksComponent {
  public allBooks: any[] = [];
  public userBooks: any[] = [];
  public userBookId: any;
  @Output() redirectToSwap = new EventEmitter<boolean>();

  public selectedBookId: string = '';

  constructor(private bookService: BookServices, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log(1);

      this.bookService.getUserBooks({ id: userId }).subscribe((data: any[]) => {
        this.userBooks = data;
      });
    }

    this.bookService.getBooks().subscribe((data: any[]) => {
      this.allBooks = data;
      if (this.allBooks.length > 0) {
        this.redirectToSwap.emit(true);
      }
    });

    const bookId = this.selectedBookId;
    console.log(bookId);

    if (bookId) {
      this.bookService.getBookId(bookId).subscribe((data: any[]) => {
        this.userBookId = data;
        console.log(this.userBookId);
      });
    }
  }

  public selectBook(bookId: string) {
    this.selectedBookId = bookId;
    console.log(this.selectedBookId);
    this.router.navigate(['edit-book', this.selectedBookId]);
  }
}

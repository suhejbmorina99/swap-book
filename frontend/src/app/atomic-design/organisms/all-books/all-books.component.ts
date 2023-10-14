import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';
import { WebsocketService } from 'src/app/store/services/websocket.service';

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

  constructor(
    private bookService: BookServices,
    private router: Router,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.websocketService
        .onEvent('userBooksUpdated')
        .subscribe((updatedBooks) => {
          // Handle updates to user books in real-time
          this.userBooks.push(updatedBooks);
          console.log(this.userBooks);
        });

      this.bookService.getUserBooks({ id: userId }).subscribe((data: any[]) => {
        this.userBooks = data;
        console.log(data);
      });
    }

    this.bookService.getBooks().subscribe((data: any[]) => {
      this.allBooks = data;
      if (this.allBooks.length > 0) {
        this.redirectToSwap.emit(true);
      }
    });
  }

  public selectBook(bookId: string) {
    this.selectedBookId = bookId;
    this.router.navigate(['edit-book'], {
      queryParams: { bookId: this.selectedBookId },
    });
  }
}

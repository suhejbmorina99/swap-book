import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { BookServices } from 'src/app/store/services/book.services';
import { getBooksData } from 'src/app/store/selectors/book.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { updateBookAction } from 'src/app/store/actions/book.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent {
  private bookId: string = '';
  public userBook: any;
  public updateBook: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookServices,
    private store: Store<State>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.bookId = params['bookId'];
    });

    const selectedBookId = this.bookId;
    if (selectedBookId) {
      this.bookService.getBookId(selectedBookId).subscribe((data) => {
        this.userBook = data;
      });
    }
  }

  saveUpdatedBook() {
    this.store.dispatch(
      updateBookAction({
        bookId: this.bookId,
        title: this.userBook.book.title,
        author: this.userBook.book.author,
        isbn: this.userBook.book.isbn,
        language: this.userBook.book.language,
        condition: this.userBook.book.condition,
        numberOfPages: this.userBook.book.numberOfPages,
        category: this.userBook.book.category,
        publisher: this.userBook.book.publisher,
      })
    );
  }

  deleteBook(bookId: string) {
    if (bookId === this.bookId) {
      this.bookService.deleteUserBook(bookId).subscribe(() => {
        this.snackBar.open('The book is deleted successfully', undefined, {
          duration: 500,
        });
        setTimeout(() => {
          this.router.navigate(['main']);
        }, 530);
      });
    }
  }
}

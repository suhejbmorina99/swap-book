import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { BookServices } from 'src/app/store/services/book.services';
import { getBooksData } from 'src/app/store/selectors/book.selectors';
import { ActivatedRoute } from '@angular/router';
import { updateBookAction } from 'src/app/store/actions/book.actions';

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
    private store: Store<State>
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
      })
    );
  }
}

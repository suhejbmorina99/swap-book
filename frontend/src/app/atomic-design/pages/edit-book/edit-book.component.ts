import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { BookServices } from 'src/app/store/services/book.services';
import { getBooksData } from 'src/app/store/selectors/book.selectors';
import { ActivatedRoute } from '@angular/router';

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

    const bookId = this.bookId;
    if (bookId) {
      this.bookService.updateUserBook(bookId).subscribe((data) => {
        this.updateBook = data;
      });
    }
  }
}

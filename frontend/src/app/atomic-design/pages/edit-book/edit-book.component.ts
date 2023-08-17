import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { BookServices } from 'src/app/store/services/book.services';
import { getBooksData } from 'src/app/store/selectors/book.selectors';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent {
  public userBook: any[] = [];
  public editModeOn: boolean = false;
  public bookId = '';
  public editedBook: any;
  public selectedBookId: string = '';

  constructor(private bookService: BookServices, private store: Store<State>) {}

  openEditMode(bookId: any) {
    this.selectedBookId = bookId;
    console.log(this.selectedBookId);

    this.store.select(getBooksData).subscribe((bookData) => {
      if (bookData) {
        console.log(bookData);

        this.editedBook = bookData.find(
          (book) => book.id === this.selectedBookId
        );
        console.log(this.editedBook.id);
      }
    });

    if (this.editedBook.id === this.selectedBookId) {
      this.editModeOn = true;
      console.log(1);
    }
  }
  closeEditMode() {
    this.editModeOn = false;
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService.getUserBooks({ id: userId }).subscribe((data: any[]) => {
        this.userBook = data;
      });
    }
    // this.bookService.updateUserBook(bookId: '',book.title);
  }

  saveChanges() {
    console.log('1');

    this.closeEditMode();
  }
}

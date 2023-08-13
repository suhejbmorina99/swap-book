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

  constructor(private bookService: BookServices, private store: Store<State>) {
    this.store.select(getBooksData).subscribe((bookData) => {
      if (bookData) {
        const targetBookId = this.selectedBookId;

        this.editedBook = bookData.find((book) => book.id === targetBookId);

        if (this.editedBook) {
          this.selectedBookId = this.editedBook.id;
          console.log(this.selectedBookId);
        }
      }
    });
  }

  openEditMode(bookId: any) {
    // this.selectedBookId = bookId;
    // console.log(this.selectedBookId);
    // if (this.editedBook.id === this.selectedBookId) {

    this.editModeOn = true;
    // }

    // this.editModeOn = !this.editModeOn;
  }
  closeEditMode() {
    this.editModeOn = false;
    // this.editedBook = null;
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

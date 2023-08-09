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

  constructor(private bookService: BookServices, private store: Store<State>) {
    this.store.select(getBooksData).subscribe((books) => {
      if (books) {
        this.bookId = books.id;
      }
    });
  }

  openEditMode() {
    this.editModeOn = !this.editModeOn;
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
    console.log(this.bookId);
    // this.bookService.updateUserBook(bookId: '',book.title);
  }

  saveChanges() {
    console.log('1');
  }
}

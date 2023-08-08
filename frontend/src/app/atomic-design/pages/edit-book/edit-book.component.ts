import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent {
  public userBook: any[] = [];
  public editModeOn: boolean = false;

  constructor(private bookService: BookServices, private store: Store<State>) {}

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

    // this.bookService.updateUserBook(bookId: '',book.title);
  }

  saveChanges() {
    console.log('1');
  }
}

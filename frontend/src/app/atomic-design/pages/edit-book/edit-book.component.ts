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
  // openEditMode(bookId: any) {
  //   this.selectedBookId = bookId;
  //   console.log(this.selectedBookId);

  //   this.store.select(getBooksData).subscribe((bookData) => {
  //     if (bookData) {
  //       console.log(bookData);

  //       this.editedBook = bookData.find(
  //         (book) => book.id === this.selectedBookId
  //       );
  //       console.log(this.editedBook.id);
  //     }
  //   });

  //   if (this.editedBook.id === this.selectedBookId) {
  //     this.editModeOn = true;
  //     console.log(1);
  //   }
  // }
  // closeEditMode() {
  //   this.editModeOn = false;
  // }

  // ngOnInit() {
  //   const userId = localStorage.getItem('userId');
  //   if (userId) {
  //     this.bookService.getBookId(userId).subscribe((data: any[]) => {
  //       this.userBook = data;
  //     });
  //   }
  //   // this.bookService.updateUserBook(bookId: '',book.title);
  // }

  // saveChanges() {
  //   console.log('1');

  //   this.closeEditMode();
  // }

  private bookId: string = '';
  public userBook: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookServices,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.bookId = params['bookId'];
      console.log(this.bookId);
      
      // Fetch book details or perform other actions based on this.bookId
    });

    const selectedBookId = this.bookId;
    if (selectedBookId) {
      this.bookService.getBookId(selectedBookId).subscribe((data) => {
        this.userBook = data;
        console.log(this.userBook);
      });
    }
  }
}

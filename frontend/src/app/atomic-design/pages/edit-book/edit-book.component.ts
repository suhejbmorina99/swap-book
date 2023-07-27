import { Component } from '@angular/core';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent {
  public allBooks: any[] = [];
  public editModeOn: boolean = false;

  constructor(private bookService: BookServices) {}

  openEditMode() {
    this.editModeOn = !this.editModeOn;
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService.getUserBooks({ id: userId }).subscribe((data: any[]) => {
        this.allBooks = data;
      });
    }
  }

  saveChanges() {
    console.log('1');
  }
}

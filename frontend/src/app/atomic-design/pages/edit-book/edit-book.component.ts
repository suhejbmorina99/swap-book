import { Component } from '@angular/core';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent {
  public allBooks: any[] = [];

  constructor(private bookService: BookServices) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService.getUserBooks({ id: userId }).subscribe((data: any[]) => {
        this.allBooks = data;
      });
    }
  }
}

import { Component } from '@angular/core';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent {

  public allBook: any[] = [];

  constructor(private bookService: BookServices) {}


  ngOnInit() {
    this.bookService.getBooks().subscribe((data: any[]) => {
      this.allBook = data;
    });
  }
}

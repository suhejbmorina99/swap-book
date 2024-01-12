import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ready-to-swap',
  templateUrl: './ready-to-swap.component.html',
  styleUrls: ['./ready-to-swap.component.scss'],
})
export class ReadyToSwapComponent {
  public userBooks: any[] = [];
  public selectedBooks: any[] = [];

  constructor(
    private bookService: BookServices,
    private router: Router,
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService.getUserBooks({ id: userId }).subscribe((data: any[]) => {
        this.userBooks = data;
      });
    }
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    // Handle drop if needed
  }

  onCardClick(book: any): void {
    const isInSelected = this.isBookInArray(book, this.selectedBooks);

    if (isInSelected) {
      // Remove from selectedBooks and add back to userBooks
      const index = this.selectedBooks.indexOf(book);
      if (index !== -1) {
        this.selectedBooks.splice(index, 1);
        this.userBooks.push(book);
      }
    } else {
      // Move the selected book from userBooks to selectedBooks
      const index = this.userBooks.indexOf(book);
      if (index !== -1) {
        this.userBooks.splice(index, 1);
        this.selectedBooks.push({
          title: book.title,
          author: book.author,
          condition: book.condition,
          // Add other properties as needed
        });
      }
    }
  }

  private isBookInArray(book: any, array: any[]): boolean {
    return array.some((item) => item.title === book.title);
  }
}

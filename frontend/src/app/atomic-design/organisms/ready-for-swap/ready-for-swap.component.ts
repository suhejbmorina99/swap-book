import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ready-for-swap',
  templateUrl: './ready-for-swap.component.html',
  styleUrls: ['./ready-for-swap.component.scss'],
})
export class ReadyForSwapComponent implements OnChanges {
  @Input() specificAuthor = '';
  @Input() specificCategory = '';
  @Input() specificLanguage = '';
  @Input() specificBook = '';

  public otherBooks: any[] = [];
  public otherAuthors: any[] = [];
  public specificCategories: any[] = [];
  public setLanguage: any[] = [];
  public specificTitle: any[] = [];
  public selectedBooks: any[] = [];

  constructor(
    private bookService: BookServices,
    private router: Router,
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService.getOtherBooks({ id: userId }).subscribe(
        (data: any[]) => {
          this.otherBooks = data;
        },
        (error: any) => {
          if (error.status === 404) {
            console.log('No other books exists');
          }
        },
      );
    }

    if (userId && this.specificBook) {
      this.bookService.searchByTitle(userId, this.specificBook).subscribe(
        (data: any[]) => {
          this.specificTitle = data;
        },
        (error: any) => {
          if (error.status === 404) this.specificTitle = [];
        },
      );
    }

    if (this.specificAuthor) {
      this.bookService
        .getFilterAuthor(this.specificAuthor)
        .subscribe((data: any[]) => {
          this.otherAuthors = data;
          this.otherBooks = [];
        });
    } else {
      this.otherAuthors = [];
    }

    if (this.specificCategory) {
      this.bookService
        .getCategories(this.specificCategory)
        .subscribe((data: any[]) => {
          this.specificCategories = data;
          this.otherBooks = [];
        });
    } else {
      this.specificCategories = [];
    }

    if (this.specificLanguage && userId) {
      this.bookService
        .getByLanguage(this.specificLanguage, userId)
        .subscribe((data: any[]) => {
          this.setLanguage = data;
          this.otherBooks = [];
        });
    } else {
      this.setLanguage = [];
    }
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    // Handle drop if needed
  }

  onCardClick(book: any): void {
    const isInSelected = this.isBookInArray(book, this.selectedBooks);
    console.log(isInSelected);

    if (isInSelected) {
      // Remove from selectedBooks and add back to userBooks
      const index = this.selectedBooks.indexOf(book);
      if (index !== -1) {
        this.selectedBooks.splice(index, 1);
        this.otherBooks.push(book);
      }
    } else {
      // Move the selected book from userBooks to selectedBooks
      const index = this.otherBooks.indexOf(book);
      const indexOfCategories = this.specificCategories.indexOf(book);
      console.log(index);
      if (index !== -1) {
        this.otherBooks.splice(index, 1);
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

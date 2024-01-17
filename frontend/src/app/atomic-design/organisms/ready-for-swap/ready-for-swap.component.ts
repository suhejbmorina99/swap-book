import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FilterService } from '../../../../shared/services/shared.service';

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
    private filterService: FilterService,
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

    this.filterService.clearFilter$.subscribe(() => {
      // Clear the selected books when the clear filter is triggered
      this.selectedBooks = [];
      this.fetchBooksAgain();
    });
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    // Handle drop if needed
  }

  onCardClick(book: any): void {
    const isInSelected = this.isBookInArray(book, this.selectedBooks);

    if (isInSelected) {
      console.log('1');
      // Remove from selectedBooks and add back to otherBooks or specificCategories
      const index = this.selectedBooks.findIndex(
        (item) => item.title === book.title,
      );
      if (index !== -1) {
        this.selectedBooks.splice(index, 1);

        if (this.specificAuthor) {
          // If specificAuthor is set, add back to otherAuthors
          this.otherAuthors.push(book);
        } else if (this.specificCategory) {
          // If specificCategory is set, add back to specificCategories
          this.specificCategories.push(book);
        } else {
          // If neither specificAuthor nor specificCategory is set, add back to otherBooks
          this.otherBooks.push(book);
        }
      }
    } else {
      console.log('2');
      // Move the selected book from otherBooks or specificCategories to selectedBooks
      const indexInOtherBooks = this.otherBooks.findIndex(
        (item) => item.title === book.title,
      );
      const indexInSpecificCategories = this.specificCategories.findIndex(
        (item) => item.title === book.title,
      );

      if (indexInOtherBooks !== -1) {
        this.otherBooks.splice(indexInOtherBooks, 1);
      } else if (indexInSpecificCategories !== -1) {
        this.specificCategories.splice(indexInSpecificCategories, 1);
      }

      this.selectedBooks.push({
        title: book.title,
        author: book.author,
        condition: book.condition,
        // Add other properties as needed
      });
    }
  }

  private isBookInArray(book: any, array: any[]): boolean {
    return array.some((item) => item.title === book.title);
  }

  fetchBooksAgain() {
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
  }
}

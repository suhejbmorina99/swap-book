import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';

@Component({
  selector: 'app-ready-for-swap',
  templateUrl: './ready-for-swap.component.html',
  styleUrls: ['./ready-for-swap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadyForSwapComponent implements OnChanges {
  @Input() specificAuthor = '';
  public otherBooks: any[] = [];
  public otherAuthors: any[] = [];

  constructor(
    private bookService: BookServices,
    private router: Router,
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService
        .getOtherBooks({ id: userId })
        .subscribe((data: any[]) => {
          this.otherBooks = data;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.specificAuthor) {
      console.log(this.specificAuthor);
      this.bookService
        .getFilterAuthor(this.specificAuthor)
        .subscribe((data: any[]) => {
          this.otherAuthors = data;
          console.log(this.otherAuthors);
        });
    }
  }
}

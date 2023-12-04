import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';
import { category } from 'src/shared/stores/categories-data.store';
import { language } from 'src/shared/stores/language-store';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() authorName = new EventEmitter<string>();
  @Output() selectedCategory = new EventEmitter<string>();

  public otherAuthor: any[] = [];
  public categorySource: any = category;
  public languageSource: any = language;
  public author = '';
  public categories = '';

  category = new FormControl('');
  language = new FormControl('');

  constructor(
    private bookService: BookServices,
    private router: Router,
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.bookService
        .getOtherAuthors({ id: userId })
        .subscribe((data: any[]) => {
          this.otherAuthor = data;
        });
    }
  }

  returnAuthor(author: string) {
    this.authorName.emit(author);
  }

  selectedCategories(category: string) {
    // Check if the category is already selected
    // if (!this.categories.includes(category)) {
    //   // If not selected, add it to the array
    //   this.categories.push(category);
    // } else {
    //   // If already selected, remove it from the array
    //   this.categories = this.categories.filter(
    //     (selectedCategory) => selectedCategory !== category,
    //   );
    // }
    //
    // // Log the categories before emitting the event
    // console.log('Updated Categories:', this.categories);

    // Emit the updated array of selected categories
    this.selectedCategory.emit(category);
    console.log(category)
  }
}

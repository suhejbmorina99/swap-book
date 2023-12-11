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
  @Output() setLanguage = new EventEmitter<string>();

  public otherAuthor: any[] = [];
  public categorySource: any = category;
  public languageSource: any = language;

  category = new FormControl('');
  language = new FormControl('');
  author = new FormControl('');

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
    this.selectedCategory.emit('');
    this.category.setValue('');
    this.setLanguage.emit('');
    this.language.setValue('');
  }

  selectedCategories(category: string) {
    this.selectedCategory.emit(category);
    this.authorName.emit('');
    this.author.setValue('');
    this.setLanguage.emit('');
    this.language.setValue('');
  }

  selectedLanguage(language: string) {
    console.log(language);
    this.setLanguage.emit(language);
    this.authorName.emit('');
    this.author.setValue('');
    this.selectedCategory.emit('');
    this.category.setValue('');
  }
}

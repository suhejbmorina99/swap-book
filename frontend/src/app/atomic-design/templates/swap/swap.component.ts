import { Component } from '@angular/core';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss'],
})
export class SwapComponent {
  public specificAuthor = '';
  public specificCategories = '';
  public specificLanguage = '';
  public specificBook = '';

  authorName(name: string) {
    this.specificAuthor = name;
  }

  selectedCategory(categories: string) {
    this.specificCategories = categories;
  }

  setLanguage(language: string) {
    this.specificLanguage = language;
  }

  searchBook(title: string) {
    this.specificBook = title;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss'],
})
export class SwapComponent {
  public specificAuthor = '';
  public specificCategories: string[] = [];

  authorName(name: string) {
    this.specificAuthor = name;
  }

  selectedCategory(categories: string[]) {
    this.specificCategories = categories;
    console.log(categories);
  }
}

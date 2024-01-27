import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookServices } from 'src/app/store/services/book.services';
import { category } from 'src/shared/stores/categories-data.store';
import { language } from 'src/shared/stores/language-store';
import { FilterService } from '../../../../shared/services/shared.service';
import { WebsocketService } from '../../../store/services/websocket.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() authorName = new EventEmitter<string>();
  @Output() selectedCategory = new EventEmitter<string>();
  @Output() setLanguage = new EventEmitter<string>();
  @Output() searchByTitle = new EventEmitter<string>();

  public otherAuthor: any[] = [];
  public categorySource: any = category;
  public languageSource: any = language;
  public search: string = '';

  category = new FormControl('');
  language = new FormControl('');
  author = new FormControl('');

  constructor(
    private bookService: BookServices,
    private router: Router,
    private filterService: FilterService,
    private webSocketService: WebsocketService,
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
    this.searchByTitle.emit('');
    this.search = '';
  }

  selectedCategories(category: string) {
    this.selectedCategory.emit(category);
    this.authorName.emit('');
    this.author.setValue('');
    this.setLanguage.emit('');
    this.language.setValue('');
    this.searchByTitle.emit('');
    this.search = '';
  }

  selectedLanguage(language: string) {
    this.setLanguage.emit(language);
    this.authorName.emit('');
    this.author.setValue('');
    this.selectedCategory.emit('');
    this.category.setValue('');
    this.searchByTitle.emit('');
    this.search = '';
  }

  onSearchChange() {
    this.searchByTitle.emit(this.search);
    this.authorName.emit('');
    this.author.setValue('');
    this.selectedCategory.emit('');
    this.category.setValue('');
    this.setLanguage.emit('');
    this.language.setValue('');
  }

  clearFilter(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.authorName.emit('');
    this.author.setValue('');
    this.selectedCategory.emit('');
    this.category.setValue('');
    this.setLanguage.emit('');
    this.language.setValue('');
    this.searchByTitle.emit('');
    this.search = '';

    this.filterService.clearFilter();
  }

  swapBook() {
    console.log('1');
    this.webSocketService.onEvent('swapRequest').subscribe((swapData: any) => {
      // Display a notification or open a dialog to show the swap request
      console.log('Swap Request Received:', swapData);
      // You can trigger the display of a dialog or notification here
    });
  }
}

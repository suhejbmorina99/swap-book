import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { category } from 'src/shared/stores/categories-data.store';
import { language } from 'src/shared/stores/language-store';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  public categorySource: any = category;
  public languageSource: any = language;

  category = new FormControl('');
  language = new FormControl('');
}

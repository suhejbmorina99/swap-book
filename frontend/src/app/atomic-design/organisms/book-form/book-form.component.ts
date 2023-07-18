import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { condition } from 'src/shared/stores/book-condition-store';
import { BookFieldsEnum } from 'src/shared/enums/book-field.enum';
import { bookRequestAction } from 'src/app/store/actions/book.actions';
import { language } from 'src/shared/stores/language-store';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent {
  public bookForm: FormGroup;
  public conditionData: any = condition;
  public languageSource: any = language;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      condition: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessage() {
    const titleControl = this.bookForm.get('title');
    const authorControl = this.bookForm.get('author');
    const isbnControl = this.bookForm.get('isbn');
    const languageControl = this.bookForm.get('language');
    const conditionControl = this.bookForm.get('condition');

    if (
      titleControl?.hasError('required') ||
      authorControl?.hasError('required') ||
      isbnControl?.hasError('required') ||
      languageControl?.hasError('required') ||
      conditionControl?.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return '';
  }

  registerBook() {
    this.store.dispatch(
      bookRequestAction({
        title: this.bookForm.controls[BookFieldsEnum.Title].value,
        author: this.bookForm.controls[BookFieldsEnum.Author].value,
        isbn: this.bookForm.controls[BookFieldsEnum.Isbn].value,
        language: this.bookForm.controls[BookFieldsEnum.Language].value,
        condition: this.bookForm.controls[BookFieldsEnum.Condition].value,
      })
    );

    this.bookForm.reset();
  }

  get title() {
    return this.bookForm.get('title');
  }
  get author() {
    return this.bookForm.get('author');
  }
  get isbn() {
    return this.bookForm.get('isbn');
  }
  get language() {
    return this.bookForm.get('language');
  }
  get condition() {
    return this.bookForm.get('condition');
  }

  ngOnInit() {}
}

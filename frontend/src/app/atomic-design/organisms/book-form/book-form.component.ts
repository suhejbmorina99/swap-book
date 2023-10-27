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
  public userBookId: string = '';

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      condition: new FormControl('', [Validators.required]),
      numberOfPages: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      category: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessage() {
    const titleControl = this.bookForm.get('title');
    const authorControl = this.bookForm.get('author');
    const isbnControl = this.bookForm.get('isbn');
    const languageControl = this.bookForm.get('language');
    const conditionControl = this.bookForm.get('condition');
    const numberOfPagesControl = this.bookForm.get('numberOfPages');
    const categoryControl = this.bookForm.get('category');
    const publisherControl = this.bookForm.get('publisher');

    if (
      titleControl?.hasError('required') ||
      authorControl?.hasError('required') ||
      isbnControl?.hasError('required') ||
      languageControl?.hasError('required') ||
      conditionControl?.hasError('required') ||
      numberOfPagesControl?.hasError('required') ||
      categoryControl?.hasError('required') ||
      publisherControl?.hasError('required')
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
        numberOfPages:
          this.bookForm.controls[BookFieldsEnum.NumberOfPages].value,
        category: this.bookForm.controls[BookFieldsEnum.Category].value,
        publisher: this.bookForm.controls[BookFieldsEnum.Publisher].value,
        user: {
          id: this.userBookId,
        },
      })
    );

    this.bookForm.reset();
    this.bookForm.controls['title'].setErrors(null);
    this.bookForm.controls['author'].setErrors(null);
    this.bookForm.controls['isbn'].setErrors(null);
    this.bookForm.controls['language'].setErrors(null);
    this.bookForm.controls['condition'].setErrors(null);
    this.bookForm.controls['numberOfPages'].setErrors(null);
    this.bookForm.controls['category'].setErrors(null);
    this.bookForm.controls['publisher'].setErrors(null);
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
  get numberOfPages() {
    return this.bookForm.get('numberOfPages');
  }
  get category() {
    return this.bookForm.get('category');
  }
  get publisher() {
    return this.bookForm.get('publisher');
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userBookId = userId;
    }
  }
}

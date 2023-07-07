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

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent {
  public bookForm: FormGroup;
  public conditionData: any = condition;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      condition: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessage() {
    const titleControl = this.bookForm.get('title');
    const isbnControl = this.bookForm.get('isbn');
    const languageControl = this.bookForm.get('language');
    const conditionControl = this.bookForm.get('condition');

    if (
      titleControl?.hasError('required') ||
      isbnControl?.hasError('required') ||
      languageControl?.hasError('required') ||
      conditionControl?.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return '';
  }

  registerUser() {
    // this.store.dispatch(
    //   registerRequestAction({
    //     title: this.loginForm.controls[BookFieldsEnum.Title].value,
    //     isbn: this.loginForm.controls[BookFieldsEnum.Isbn].value,
    //     language: this.loginForm.controls[BookFieldsEnum.Language].value,
    //     condition: this.loginForm.controls[BookFieldsEnum.Condition].value,
    //   })
    // );
  }

  get title() {
    return this.bookForm.get('title');
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

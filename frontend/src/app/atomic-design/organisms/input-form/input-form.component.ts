import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { loginRequestAction } from 'src/app/store/actions/auth.actions';
import { LoginFieldsEnum } from 'src/shared/enums/login-field.enum';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent {
  public showPassword = false;
  public type = 'password';
  public loginForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  getErrorMessage() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (
      emailControl?.hasError('required') ||
      passwordControl?.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return '';
  }

  loginUser() {
    this.store.dispatch(
      loginRequestAction({
        email: this.loginForm.controls[LoginFieldsEnum.Email].value,
        password: this.loginForm.controls[LoginFieldsEnum.Password].value,
      })
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {}

  togglePassword(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }
}

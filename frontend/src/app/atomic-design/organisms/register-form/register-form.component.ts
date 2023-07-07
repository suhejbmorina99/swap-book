import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import { countries } from 'src/shared/stores/country-data-store';
import { City } from 'src/shared/models/city';
import { cities } from 'src/shared/stores/city-data-store';
import { registerRequestAction } from 'src/app/store/actions/auth.actions';
import { LoginFieldsEnum } from 'src/shared/enums/login-field.enum';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  public showPassword = false;
  public type = 'password';
  public loginForm: FormGroup;
  public countries: any = countries;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessage() {
    const nameControl = this.loginForm.get('name');
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    const phoneControl = this.loginForm.get('phone');
    const countryControl = this.loginForm.get('country');
    const cityControl = this.loginForm.get('city');

    if (
      nameControl?.hasError('required') ||
      emailControl?.hasError('required') ||
      passwordControl?.hasError('required') ||
      phoneControl?.hasError('required') ||
      countryControl?.hasError('required') ||
      cityControl?.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return '';
  }

  registerUser() {
    this.store.dispatch(
      registerRequestAction({
        name: this.loginForm.controls[LoginFieldsEnum.Name].value,
        email: this.loginForm.controls[LoginFieldsEnum.Email].value,
        password: this.loginForm.controls[LoginFieldsEnum.Password].value,
        phone: this.loginForm.controls[LoginFieldsEnum.Phone].value,
        country: this.loginForm.controls[LoginFieldsEnum.Country].value,
        city: this.loginForm.controls[LoginFieldsEnum.City].value,
      })
    );
  }

  get name() {
    return this.loginForm.get('name');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get phone() {
    return this.loginForm.get('phone');
  }
  get country() {
    return this.loginForm.get('country');
  }
  get city() {
    return this.loginForm.get('city');
  }

  ngOnInit() {}

  togglePassword(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }

  getCitiesByCountryCode(countryCode: string): City[] {
    return cities.filter((city) => city.countryCode === countryCode);
  }
}

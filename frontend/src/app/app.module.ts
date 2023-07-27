import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './atomic-design/templates/login/login.component';
import { RegisterComponent } from './atomic-design/templates/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SbMaterialModule } from './material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { InputFormComponent } from './atomic-design/organisms/input-form/input-form.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store';
import { AuthServices } from './store/services/auth.services';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterFormComponent } from './atomic-design/organisms/register-form/register-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MainComponent } from './atomic-design/templates/main/main.component';
import { BookFormComponent } from './atomic-design/organisms/book-form/book-form.component';
import { AllBooksComponent } from './atomic-design/organisms/all-books/all-books.component';
import { MatCardModule } from '@angular/material/card';
import { BookEffects } from './store/effects/book.effects';
import { BookServices } from './store/services/book.services';
import { SwapComponent } from './atomic-design/templates/swap/swap.component';
import { EditBookComponent } from './atomic-design/pages/edit-book/edit-book.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InputFormComponent,
    RegisterFormComponent,
    MainComponent,
    BookFormComponent,
    AllBooksComponent,
    SwapComponent,
    EditBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    SbMaterialModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    EffectsModule.forRoot([AuthEffects, BookEffects]),
    MatSelectModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [AuthServices, BookServices],
  bootstrap: [AppComponent],
})
export class AppModule {}

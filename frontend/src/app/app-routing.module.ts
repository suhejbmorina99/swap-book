import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './atomic-design/templates/login/login.component';
import { RegisterComponent } from './atomic-design/templates/register/register.component';
import { MainComponent } from './atomic-design/templates/main/main.component';
import { SwapComponent } from './atomic-design/templates/swap/swap.component';
import { EditBookComponent } from './atomic-design/pages/edit-book/edit-book.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'swap',
    component: SwapComponent,
  },
  {
    path: 'edit-book',
    component: EditBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

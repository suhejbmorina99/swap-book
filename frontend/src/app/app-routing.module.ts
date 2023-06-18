import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './atomic-design/templates/login/login.component';
import { RegisterComponent } from './atomic-design/templates/register/register.component';
import { MainComponent } from './atomic-design/templates/main/main.component';
import { AnimationComponent } from './atomic-design/pages/animation/animation.component';

const routes: Routes = [
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
    path: 'success-login',
    component: AnimationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

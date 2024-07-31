import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
];

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Import the FormsModule here
  ],
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/features/login/login.component';
import { HeaderComponent } from './components/shared/app-components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { DropdownComponent } from './components/shared/ui/dropdown/dropdown.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, HeaderComponent, DropdownComponent],
})
export class LoginModule {}

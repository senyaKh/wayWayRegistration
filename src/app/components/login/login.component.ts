import { Component } from '@angular/core';
import { HlmButtonDirective } from '../ui-button-helm/src/lib/hlm-button.directive';
import { HlmInputModule } from '../ui-input-helm/src';
import { HlmLabelDirective } from '../ui-label-helm/src/lib/hlm-label.directive';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    HlmButtonDirective,
    CommonModule,
    HlmInputModule,
    HlmLabelDirective,
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordMatch: boolean = true;
  onSubmit() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password',
    ) as HTMLInputElement;
    const confirmPassword = document.getElementById(
      'confirm-password',
    ) as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordMatch = confirmPassword.value === password;
    if (
      email &&
      password &&
      this.isValidEmail(email) &&
      password.length >= 6 &&
      passwordMatch
    ) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      alert(
        `Пароль и почта сохранены в локальном хранилище ${email} ${password}`,
      );
    } else if (!passwordMatch) {
      this.passwordMatch = false;
      alert('Пароли не совпадают');
    }
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  get isFormValid(): string | boolean {
    return (
      this.email &&
      this.password &&
      this.isValidEmail(this.email) &&
      this.password.length >= 6 &&
      this.passwordMatch
    );
  }
}

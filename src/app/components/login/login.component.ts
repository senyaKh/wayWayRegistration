import { Component } from '@angular/core';
import { HlmButtonDirective } from '../ui-button-helm/src/lib/hlm-button.directive';
import { HlmInputModule } from '../ui-input-helm/src';
import { HlmLabelDirective } from '../ui-label-helm/src/lib/hlm-label.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
})
export class LoginComponent {
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMatch: boolean = true;
  isValidPhone: boolean = true;

  phoneTouched: boolean = false;
  passwordTouched: boolean = false;
  confirmPasswordTouched: boolean = false;
  formSubmitted: boolean = false;

  onSubmit() {
    this.formSubmitted = true;
    this.phoneTouched = true;
    this.passwordTouched = true;
    this.confirmPasswordTouched = true;

    this.passwordMatch = this.confirmPassword === this.password;
    this.isValidPhone = this.isPhoneValid(this.phone);

    if (this.isFormValid()) {
      localStorage.setItem('phone', this.phone);
      localStorage.setItem('password', this.password);
      console.log('Данные верны, можно продолжить регистрацию.');
    } else {
      console.log('Ошибка при вводе данных.');
      if (!this.passwordMatch) {
        console.error('Пароли не совпадают');
      }
      if (!this.isValidPhone) {
        console.error('Неверный формат номера телефона');
      }
      if (!this.isValidPassword(this.password)) {
        console.error('Пароль содержит недопустимые символы');
      }
    }
  }

  isPhoneValid(phone: string): boolean {
    const re = /^\+\d{1,3}\d{9,}$/;
    return re.test(phone);
  }

  isValidPassword(password: string): boolean {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(password);
  }

  isFormValid(): string | boolean {
    return (
      this.phone &&
      this.password &&
      this.confirmPassword &&
      this.password.length >= 6 &&
      this.passwordMatch &&
      this.isValidPhone &&
      this.isValidPassword(this.password)
    );
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    switch (target.name) {
      case 'phone':
        this.phoneTouched = value.length > 0;
        break;
      case 'password':
        this.passwordTouched = value.length > 0;
        break;
      case 'confirm-password':
        this.confirmPasswordTouched = value.length > 0;
        break;
    }
  }
}

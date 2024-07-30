import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password',
    ) as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password && this.isValidEmail(email) && password.length >= 6) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      console.log(
        'Email and password stored in localStorage:',
        email,
        password,
      );
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
      this.password.length >= 6
    );
  }
}

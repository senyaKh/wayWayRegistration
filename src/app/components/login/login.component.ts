import { Component } from '@angular/core';
import { HlmButtonDirective } from '../ui-button-helm/src/lib/hlm-button.directive';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
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

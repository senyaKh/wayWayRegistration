import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { TelephoneInputComponent } from '../../shared/ui/telephone-input/telephone-input.component';
import { DropdownComponent } from '../../shared/ui/dropdown/dropdown.component';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HlmInputModule,
    HlmLabelDirective,
    TelephoneInputComponent,
    DropdownComponent,
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

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  showModal: boolean = false;
  onSubmit() {
    const phoneInputElement = document.getElementById(
      'phoneInput',
    ) as HTMLInputElement;
    this.phone = phoneInputElement?.value || '';

    this.formSubmitted = true;
    this.phoneTouched = true;
    this.passwordTouched = true;
    this.confirmPasswordTouched = true;

    this.passwordMatch = this.confirmPassword === this.password;
    this.isValidPhone = this.isPhoneValid(this.phone);

    if (this.isFormValid()) {
      localStorage.setItem('phone', this.phone);
      localStorage.setItem('password', this.password);
    }
  }

  isPhoneValid(phone: string): boolean {
    const re = /^\d+$/;
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

  onPhoneChange(phoneNumber: string) {
    this.phone = phoneNumber;
    this.isValidPhone = this.isPhoneValid(this.phone);
    this.phoneTouched = this.phone.length > 0;
  }
}

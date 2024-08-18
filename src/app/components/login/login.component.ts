import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmInputModule } from '../ui-input-helm/src';
import { HlmLabelDirective } from '../ui-label-helm/src/lib/hlm-label.directive';
import { TelephoneInputComponent } from '../telephone-input/telephone-input.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HlmInputModule,
    HlmLabelDirective,
    TelephoneInputComponent,
    DropdownComponent,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  currentIndex = 0;

  photos = [
    { id: 1, caption: 'Подпись 1' },
    { id: 2, caption: 'Подпись 2' },
    { id: 3, caption: 'Подпись 3' },
    { id: 4, caption: 'Подпись 4' },
    { id: 5, caption: 'Подпись 5' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onPhoneChange(event: { number: string; isValid: boolean }) {
    console.log('Получено событие phoneChange:', event);

    if (event.isValid) {
      this.form.patchValue({ phone: event.number });
      this.form.controls['phone'].setErrors(null);
      console.log('Номер телефона установлен:', event.number);
    } else {
      this.form.controls['phone'].setErrors({ invalidPhone: true });
      console.log('Номер телефона некорректен:', event.number);
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    // Логируем значение перед отправкой формы
    console.log('Значение формы:', this.form.value);

    if (!this.form.controls['phone'].valid) {
      console.error('Некорректный номер телефона.');
      return;
    }

    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.error('Form is invalid');
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

<<<<<<< Updated upstream
  showModal: boolean = false;
  onSubmit() {
    const phoneInputElement = document.getElementById('phoneInput') as HTMLInputElement;
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
    console.log(this.isValidPhone);
    console.log(this.phone);
  }

  currentIndex = 0;
  photos = [
    { id: 1, caption: 'СТРАХОВОЙ АГЕНТ' },
    { id: 2, caption: 'ПАЦИЕНТ' },
    { id: 3, caption: 'СТОМАТОЛОГ' },
    { id: 4, caption: 'СТОМАТОЛОГИЯ' },
    { id: 5, caption: 'СТОМАТОЛОГ' },
  ];

=======
>>>>>>> Stashed changes
  onPrevClick() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  onNextClick() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    } else if (this.currentIndex === this.photos.length - 1) {
      this.currentIndex = 0;
    }
  }

  onSelectPhoto(index: number) {
    this.currentIndex = index;
  }
}

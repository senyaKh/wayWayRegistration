import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
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
  phoneTouched = false;
  passwordTouched = false;
  confirmPasswordTouched = false;
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMatch: boolean = false;
  isValidPhone: boolean = false;
  currentIndex = 0;

  photos = [
    { id: 1, caption: 'СТРАХОВОЙ АГЕНТ' },
    { id: 2, caption: 'ПАЦИЕНТ' },
    { id: 3, caption: 'СТОМАТОЛОГ' },
    { id: 4, caption: 'СТОМАТОЛОГИЯ' },
    { id: 5, caption: 'СТОМАТОЛОГ' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        phone: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );

    this.form.valueChanges.subscribe(() => {
      this.formSubmitted = false;
    });
  }

  passwordValidator(control: AbstractControl) {
    const value = control.value;
    const passwordRegex = /^[A-Za-z0-9]+$/;
    if (value && !passwordRegex.test(value)) {
      return { invalidPassword: true };
    }
    return null;
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
      this.isValidPhone = true;
    } else {
      this.form.controls['phone'].setErrors({ invalidPhone: true });
      this.isValidPhone = false;
    }

    const phoneInputField = document.querySelector('#phoneInput');
    if (event.isValid) {
      phoneInputField?.classList.add('valid');
      phoneInputField?.classList.remove('invalid');
    } else {
      phoneInputField?.classList.add('invalid');
      phoneInputField?.classList.remove('valid');
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    this.passwordMatch =
      this.form.get('password')?.value ===
      this.form.get('confirmPassword')?.value;

    if (this.form.valid && this.isValidPhone && this.passwordMatch) {
      console.log('Данные верны, можно продолжить регистрацию.');
    } else {
      console.log('Ошибка при вводе данных.');
      if (!this.passwordMatch) {
        console.error('Пароли не совпадают');
      }
      if (!this.isValidPhone) {
        console.error('Неверный формат номера телефона');
      }
      if (this.form.controls['password'].hasError('minlength')) {
        console.error('Пароль должен содержать не менее 6 символов');
      }
      if (this.form.controls['password'].hasError('invalidPassword')) {
        console.error('Пароль должен содержать только латинские буквы и цифры');
      }
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  onPrevClick() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  onNextClick() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  onSelectPhoto(index: number) {
    this.currentIndex = index;
  }
}

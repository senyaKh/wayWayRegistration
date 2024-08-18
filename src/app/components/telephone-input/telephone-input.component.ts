import {
  Component,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  standalone: true,
  selector: 'app-telephone-input',
  templateUrl: './telephone-input.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./telephone-input.component.scss'],
})
export class TelephoneInputComponent implements AfterViewInit {
  @Output() phoneChange = new EventEmitter<{
    number: string;
    isValid: boolean;
  }>();

  @ViewChild('phoneInput', { static: true })
  phoneInput!: ElementRef<HTMLInputElement>;
  itiInstance: any;

  ngAfterViewInit(): void {
    this.initializeIntlTelInput();
  }

  initializeIntlTelInput(): void {
    this.itiInstance = intlTelInput(this.phoneInput.nativeElement, {
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js',
      initialCountry: 'auto',
      separateDialCode: false,
      geoIpLookup: (callback) => {
        fetch('https://ipapi.co/json/')
          .then((response) => response.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback('us'));
      },
    });

    console.log('intl-tel-input и utilsScript загружены:', this.itiInstance);

    this.phoneInput.nativeElement.addEventListener('blur', () =>
      this.emitPhoneChange(),
    );
    this.phoneInput.nativeElement.addEventListener('input', () =>
      this.emitPhoneChange(),
    );
  }

  emitPhoneChange(): void {
    const rawNumber = this.phoneInput.nativeElement.value;

    const isValid = this.validatePhoneNumber(rawNumber);
    const formattedNumber = isValid ? rawNumber : '';

    this.phoneChange.emit({ number: formattedNumber, isValid });

    if (isValid) {
      this.phoneInput.nativeElement.classList.add('valid');
      this.phoneInput.nativeElement.classList.remove('invalid');
    } else {
      this.phoneInput.nativeElement.classList.add('invalid');
      this.phoneInput.nativeElement.classList.remove('valid');
    }
  }

  validatePhoneNumber(phone: string): boolean {
    const phoneRegEx = /^\+?\d{10,14}$/;
    return phoneRegEx.test(phone);
  }
}

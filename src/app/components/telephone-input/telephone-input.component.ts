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
      separateDialCode: true,
      geoIpLookup: (callback) => {
        fetch('https://ipapi.co/json/')
          .then((response) => response.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback('us'));
      },
    });

    this.phoneInput.nativeElement.addEventListener('blur', () => {
      const isValid = this.itiInstance.isValidNumber();
      const number = this.itiInstance.getNumber();

      // Логирование данных
      console.log('Номер телефона из intl-tel-input:', number);
      console.log('Валидность номера:', isValid);

      if (isValid && number) {
        this.phoneChange.emit({ number, isValid });
      } else {
        this.phoneChange.emit({ number: '', isValid: false });
      }
    });
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import {
  FormGroup,
  ValidatorFn,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-telephone-input',
  standalone: true,
  templateUrl: './telephone-input.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./telephone-input.component.scss'],
})
export class TelephoneInputComponent implements AfterViewInit {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() preferredCountries: string[] = [
    'by',
    'ru',
    'ua',
    'pl',
    'lv',
    'lt',
    'es',
  ];

  @Output() itiInitialized = new EventEmitter<any>();

  @ViewChild('phoneInput', { static: true })
  phoneInput!: ElementRef<HTMLInputElement>;
  private itiInstance: any;

  ngAfterViewInit(): void {
    this.initializeIntlTelInput();
  }

  initializeIntlTelInput(): void {
    this.itiInstance = intlTelInput(this.phoneInput.nativeElement, {
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js',
      initialCountry: 'auto',
      geoIpLookup: (callback) => {
        fetch('https://ipapi.co/json/')
          .then((response) => response.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback('us'));
      },
      onlyCountries: this.preferredCountries,
    });

    this.itiInitialized.emit(this.itiInstance);
    const control = this.form.get(this.controlName);
    if (control) {
      control.addValidators(this.phoneValidator());
    }
  }

  phoneValidator(): ValidatorFn {
    return (_control: AbstractControl): ValidationErrors | null => {
      const isValid = this.itiInstance.isValidNumber();
      return isValid ? null : { phoneInvalid: true };
    };
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-telephone-input',
  standalone: true,
  templateUrl: './telephone-input.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./telephone-input.component.scss'],
})
export class TelephoneInputComponent implements AfterViewInit {
  @Output() phoneChange = new EventEmitter<string>();

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
      geoIpLookup: (callback: any) => {
        fetch('https://ipapi.co/json/')
          .then((response) => response.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback('us'));
      },
      onlyCountries: ['by', 'ru', 'ua', 'pl', 'lv', 'lt', 'es'],
      placeholderNumberType: 'MOBILE',
      separateDialCode: true,
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DropdownComponent {
  options = [
    { value: 'option1', label: 'Аккаунт пациента ' },
    { value: 'option2', label: 'Аккаунт стоматолога' },
    { value: 'option3', label: 'Аккаунт стоматологической клиники' },
    { value: 'option4', label: 'Аккаунт страхового агента' },
  ];

  selectedOption: string = this.options[0].value;
}

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
    { value: 'option1', label: '1' },
    { value: 'option2', label: '2' },
    { value: 'option3', label: '3' },
  ];

  selectedOption: string = this.options[0].value;
}

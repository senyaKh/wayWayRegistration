import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string>();

  verificationCode: string = '';

  closeModal() {
    this.close.emit();
  }

  submitCode() {
    this.confirm.emit(this.verificationCode);
    this.closeModal();  // Закрыть модальное окно после отправки
  }
}

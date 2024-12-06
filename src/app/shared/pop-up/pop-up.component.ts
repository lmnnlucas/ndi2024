import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'popup',
  standalone: true,
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  imports: [CommonModule]
})
export class PopupComponent {
  @Output() close = new EventEmitter<void>();
  @Input() content: any = null; 
  isVisible = false;

  openPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
    this.close.emit();
  }
}

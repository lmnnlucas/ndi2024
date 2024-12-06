import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  isVisible = false; // Contrôle de la visibilité du pop-up

  // Méthode pour ouvrir le pop-up
  openPopup() {
    this.isVisible = true;
  }

  // Méthode pour fermer le pop-up
  closePopup() {
    this.isVisible = false;
    this.close.emit();
  }
}

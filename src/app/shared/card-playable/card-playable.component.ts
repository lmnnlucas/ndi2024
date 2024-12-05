import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-card-playable',
  standalone: true,
  imports: [CommonModule, NgClass], // Assure l'utilisation de ngClass
  templateUrl: './card-playable.component.html',
  styleUrls: ['./card-playable.component.css']
})
export class CardPlayableComponent {
  @Input() backgroundType: number = 1;
  @Input() variant: 'a' | 'b' = 'a';
  @Input() isFaceUp: boolean = true;

  getBackgroundClass(): string {
    return `background-${this.backgroundType}`;
  }

  getIconUrl(): string {
    return './logo/'+this.backgroundType + '.png'
  }

  getBackImageUrl(): string {
    return `N2i_logo-black.png`;
  }
}

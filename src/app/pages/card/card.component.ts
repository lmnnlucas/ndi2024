import { Component } from '@angular/core';
import { CardPlayableComponent } from '../../shared/card-playable/card-playable.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardPlayableComponent], // CardPlayableComponent est bien importé ici
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {}

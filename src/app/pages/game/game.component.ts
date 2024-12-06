import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../models/card.model'; // Assurez-vous d'avoir défini ce modèle
import { CommonModule } from '@angular/common';
import { CardPlayableComponent } from '../../shared/card-playable/card-playable.component'
import { PopupComponent } from '../../shared/pop-up/pop-up.component'; 
import { JsonDataService } from '../../shared/json-data/json-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  styleUrls: ['./game.component.css'],
  imports: [CommonModule , CardPlayableComponent, PopupComponent ]
})
export class GameComponent implements OnInit {
  @ViewChild(PopupComponent) popup!: PopupComponent;
  jsonContent: any;
  cards: Card[] = [];
  flippedCards: Card[] = [];
  isProcessing: boolean = false;

  constructor(private jsonService: JsonDataService) {}

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8]; // Exemple de valeurs
    const deck = [...values, ...values] // Duplique les cartes
      .map((value, index) => ({
        id: index,
        isFlipped: false,
        isMatched: false,
        variant: index < 8 ? 'a' : 'b', // Si l'index est <= 8, 'a', sinon 'b'
        background : value
      }));

    this.cards = this.shuffle(deck);
  }

  shuffle(array: Card[]): Card[] {
    return array.sort(() => Math.random() - 0.5);
  }

  onCardClick(card: Card) {
    if (this.isProcessing || card.isFlipped || card.isMatched) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    this.isProcessing = true;

    const [card1, card2] = this.flippedCards;

    if (card1.background === card2.background) {
      card1.isMatched = true;
      card2.isMatched = true;
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
      }, 1000); // Attente avant de retourner les cartes
    }

    setTimeout(() => {
      this.flippedCards = [];
      this.isProcessing = false;
    }, 1000);
  }
  openPopUp(file: string) {
    this.jsonService.loadData(file).subscribe((data) => {
      this.jsonContent = data; 
      this.popup.openPopup();
    });
  }
}
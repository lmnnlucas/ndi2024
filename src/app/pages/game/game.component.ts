import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../models/card.model'; // Assurez-vous d'avoir défini ce modèle
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../../shared/pop-up/pop-up.component'; 
import { JsonDataService } from '../../shared/json-data/json-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  styleUrls: ['./game.component.css'],
  imports: [CommonModule , PopupComponent]
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
    const values = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍉', '🍒']; // Exemple de valeurs
    const deck = [...values, ...values] // Duplique les cartes
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
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

    if (card1.value === card2.value) {
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
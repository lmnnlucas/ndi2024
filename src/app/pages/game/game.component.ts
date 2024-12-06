import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../models/card.model';
import { CommonModule } from '@angular/common';
import { CardPlayableComponent } from '../../shared/card-playable/card-playable.component';
import { PopupComponent } from '../../shared/pop-up/pop-up.component';
import { JsonDataService } from '../../shared/json-data/json-data.service';
import { GameModeService } from '../../shared/gameModeService';  // Importer le service
import { pipe } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule, CardPlayableComponent, PopupComponent],
  standalone: true
})
export class GameComponent implements OnInit {
  @ViewChild(PopupComponent) popup!: PopupComponent;
  jsonContent: any;
  cards: Card[] = [];
  flippedCards: Card[] = [];
  isProcessing: boolean = false;
  popupContent: { title: string; text: string; image1: string; image2: string } | null = null;

  constructor(
    private jsonService: JsonDataService,
    private gameModeService: GameModeService  // Injecter le service
  ) {}

  ngOnInit() {
    this.loadCardDescriptions();
    this.initializeGame();
  }

  loadCardDescriptions() {
    this.jsonService.loadData('description-association-card.json').subscribe((data) => {
      this.jsonContent = data;
    });
  }

  initializeGame() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8];
    console.log(this.gameModeService.getPixelMode());
    const deck = [...values, ...values]
      .map((value, index) => ({
        id: index,
        isFlipped: false,
        isMatched: false,
        variant: index < 8 ? 'b' : 'a',
        background: value,
        pixel: this.gameModeService.getPixelMode(),  // Utiliser l'état du mode pixelisé
      } as Card));

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

      const cardDescription = this.jsonContent[card1.background];
      this.popupContent = {
        title: cardDescription?.title ?? 'Match trouvé!',
        text: cardDescription?.text ?? 'Félicitations! Vous avez trouvé une paire.',
        image1: cardDescription?.image1 ?? '',
        image2: cardDescription?.image2 ?? ''
      };

      if (this.popup) {
        this.popup.openPopup();
      }
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
      }, 1000);
    }

    setTimeout(() => {
      this.flippedCards = [];
      this.isProcessing = false;
    }, 1000);
  }

  closePopup() {
    if (this.popup) {
      this.popup.closePopup();
    }
  }

  resetGame() {
    this.initializeGame();
  }
}

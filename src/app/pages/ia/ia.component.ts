import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../models/card.model'; // Assurez-vous d'avoir défini ce modèle
import { CommonModule } from '@angular/common';
import { CardPlayableComponent } from '../../shared/card-playable/card-playable.component'
import { PopupComponent } from '../../shared/pop-up/pop-up.component'; 
import { JsonDataService } from '../../shared/json-data/json-data.service';
import { GameModeService } from '../../shared/gameModeService';  // Importer le service
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ia',
  standalone: true,
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.css',
  imports: [CommonModule , CardPlayableComponent, PopupComponent, RouterModule ]
})
export class IAComponent {
  @ViewChild(PopupComponent) popup!: PopupComponent;
  jsonContent: any;
  ia_tab : Card[] = [];
  player1Points: number = 0; // Exemple de points
  player2Points: number = 0; // Exemple de points
  activePlayer: number = 1; // 1 ou 2 pour indiquer le joueur actif
  cards: Card[] = [];
  flippedCards: Card[] = [];
  isProcessing: boolean = false;

  constructor(private jsonService: JsonDataService, private gameModeService: GameModeService  // Injecter le service
  ) {}

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
        variant: index < 8 ? 'b' : 'a', // Si l'index est <= 8, 'a', sinon 'b'
        background : value,
        pixel: this.gameModeService.getPixelMode(),  // Utiliser l'état du mode pixelisé
      } as Card ));

    this.cards = this.shuffle(deck);
  }

  shuffle(array: Card[]): Card[] {
    return array.sort(() => Math.random() - 0.5);
  }

  onCardClick(card: Card) {
    if (this.isProcessing || card.isFlipped || card.isMatched || (this.activePlayer == 2)) return;

    this.flip_card(card);
  }

  checkMatch() {
    this.isProcessing = true;

    const [card1, card2] = this.flippedCards;

    if (card1.background === card2.background) {
      if (this.activePlayer === 1) {
        this.player1Points += 1 ;
      }
      else {
        this.player2Points += 1;
      }
      card1.isMatched = true;
      card2.isMatched = true;
      this.erase_of_ia(card1);
      this.erase_of_ia(card2);
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
      }, 1000); // Attente avant de retourner les cartes
    }
    this.activePlayer = 3 - this.activePlayer;
    setTimeout(() => {
      this.flippedCards = [];
      this.isProcessing = false;
    }, 1000);
    if (this.activePlayer == 2 ){
      this.IA_turn();
    }
  }
  
  IA_turn(){
    let end = true;
    for (let card of this.cards) {
      if (!card.isMatched){
        end = false;
      }
    }
    if (end == true){
      return;
    }
    for (let card1 of this.ia_tab){
      for (let card2 of this.ia_tab){
        if (card1 != card2 && card1.background === card2.background){
          this.IA_as_a_strat(card1, card2);
          return;
        }
      }
    }
    setTimeout(() => {
      let card = null;
      do {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      card = this.cards[randomIndex];
      } while (card.isMatched || card.isFlipped );
      this.flip_card(card);
      setTimeout(() => {
        do {
          const randomIndex = Math.floor(Math.random() * this.cards.length);
          card = this.cards[randomIndex];
          } while (card.isMatched || card.isFlipped );
          this.flip_card(card);
      }, 1000); // Attente avant de retourner les cartes
    }, 2000); // Attente avant de retourner les cartes
    return;
  }

  IA_as_a_strat(card1 :Card , card2 :Card){
    console.log("strat");
    setTimeout(() => {
      this.flip_card(card1);
      setTimeout(() => {
          this.flip_card(card2);
      }, 1000); // Attente avant de retourner les cartes
    }, 2000); // Attente avant de retourner les cartes
  }

  flip_card(card : Card){
    card.isFlipped = true;
    this.flippedCards.push(card);
    if (Math.random() > 0.15){
      if (!this.is_in_ia(card)){
        this.ia_tab.push(card);
        console.log(this.ia_tab);
      }
    }
    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  erase_of_ia(card : Card){
    if (this.is_in_ia(card)){
      const index = this.ia_tab.findIndex(
        card0 =>
          card0.background === card.background &&
          card0.variant === card.variant 
      );
  
      if (index !== -1) {
        this.ia_tab.splice(index, 1); // Supprime l'élément du tableau
        console.log("erased");
      }
    }
  }

  is_in_ia(card : Card){
    let answer = false;
    for (let c of this.ia_tab ){
      if (c === card) {
        answer = true;
      }
    }
    return answer;
  }

  openPopUp(file: string) {
    this.jsonService.loadData(file).subscribe((data) => {
      this.jsonContent = data; 
      this.popup.openPopup();
    });
  }
}

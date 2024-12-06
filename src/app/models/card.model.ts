export interface Card {
    id: number;           // Identifiant unique
    isFlipped: boolean;   // État de la carte (retournée ou non)
    isMatched: boolean;   // Carte déjà trouvée
    variant : 'a' | 'b'; //
    background : number;
  }
  
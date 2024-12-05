export interface Card {
    id: number;           // Identifiant unique
    value: string;        // Valeur ou image associée
    isFlipped: boolean;   // État de la carte (retournée ou non)
    isMatched: boolean;   // Carte déjà trouvée
  }
  
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Assurez-vous que CommonModule est importé ici

@Component({
  selector: 'app-card-playable',
  standalone: true,
  imports: [CommonModule], // Assurez-vous que CommonModule est importé ici
  templateUrl: './card-playable.component.html',
  styleUrls: ['./card-playable.component.css']
})
export class CardPlayableComponent implements OnInit, OnChanges {
  @Input() backgroundType: number = 1;
  @Input() variant: 'a' | 'b' = 'a';
  @Input() isFaceUp: boolean = true;
  @Input() pixel: boolean = false;  // Si true, utiliser les images pixelisées

  public cardTitle: string = '';
  public cardImageUrl: string = ''; // Pour stocker l'URL de l'image
  public cardBackImageUrl: string = ''; // Pour l'image de l'arrière de la carte

  private cardData: any = {}; // Pour stocker les données du JSON

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCardData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Vérifiez si 'pixel' a changé
    if (changes['pixel']) {
      this.updateImageUrls(); // Mettre à jour les URL des images
    }
  }

  // Charge les données du fichier JSON
  loadCardData(): void {
    this.http.get<any>('name-card.json').subscribe(data => {
      this.cardData = data; // Sauvegarder les données du JSON
      this.updateImageUrls(); // Mettre à jour les images après avoir chargé les données
    });
  }

  // Met à jour les URL des images en fonction de pixel
  updateImageUrls(): void {
    const key = `${this.backgroundType}-${this.variant}`;
    if (this.cardData[key]) {
      const card = this.cardData[key];
      this.cardTitle = card.name;

      console.log(this.pixel)
      
      // Si pixel est true, utiliser imagePxl, sinon utiliser image
      this.cardImageUrl = this.pixel ? card.imagePxl : card.image;
    } else {
      this.cardTitle = 'Objet non trouvé';
    }
  }

  // Retourne le titre de la carte
  getTitre(): string {
    return this.cardTitle;
  }

  // Retourne la classe pour le fond de la carte (en fonction de backgroundType)
  getBackgroundClass(): string {
    return `background-${this.backgroundType}`;
  }

  // Retourne l'URL de l'icône (si nécessaire)
  getIconUrl(): string {
    return './logo/' + this.backgroundType + '.png';
  }

  // Retourne l'URL de l'image de la carte
  getImageUrl(): string {
    return this.cardImageUrl || ''; // Si imageUrl n'est pas encore défini, retourne une chaîne vide
  }

  // Retourne l'URL de l'image de l'arrière de la carte
  getBackImageUrl(): string {
    return this.pixel ? 'NDI_logo_pxl.png' : 'N2i_logo-black.png'; // Modifie selon pixel
  }
}

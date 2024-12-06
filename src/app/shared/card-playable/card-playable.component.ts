import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Ajout du CommonModule

@Component({
  selector: 'app-card-playable',
  standalone: true,
  imports: [CommonModule], // Assurez-vous que CommonModule est importé ici
  templateUrl: './card-playable.component.html',
  styleUrls: ['./card-playable.component.css']
})
export class CardPlayableComponent implements OnInit {
  @Input() backgroundType: number = 1;
  @Input() variant: 'a' | 'b' = 'a';
  @Input() isFaceUp: boolean = true;

  public cardTitle: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCardData();
  }

  loadCardData(): void {
    this.http.get<any>('name-card.json').subscribe(data => {
      const key = `${this.backgroundType}-${this.variant}`;
      if (data[key]) {
        this.cardTitle = data[key].name;
      } else {
        this.cardTitle = 'Objet non trouvé';
      }
    });
  }

  getTitre(): string {
    return this.cardTitle;
  }

  getBackgroundClass(): string {
    return `background-${this.backgroundType}`;
  }

  getIconUrl(): string {
    return './logo/' + this.backgroundType + '.png';
  }

  getImageUrl(): string {
    return `./img-card/` + this.backgroundType + '-' + this.variant + '.png';
  }

  getBackImageUrl(): string {
    return `N2i_logo-black.png`;
  }
}

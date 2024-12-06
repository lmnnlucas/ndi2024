import { Component } from '@angular/core';
import { GameModeService } from '../../shared/gameModeService'
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule]
})
export class HomeComponent {
  isPixelMode: boolean = false;  // Cette variable suit l'état du checkbox

  constructor(private gameModeService: GameModeService) {}

  // Méthode pour gérer le changement d'état du checkbox
  onCheckboxChange() {
    console.log('Mode Pixelisé activé:', this.isPixelMode);
    this.gameModeService.setPixelMode(this.isPixelMode);  // Met à jour l'état du mode pixelisé dans le service
  }
}
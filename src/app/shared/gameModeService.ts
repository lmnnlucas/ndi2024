import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameModeService {
  private isPixelMode: boolean = false;  // État du mode pixelisé

  // Méthode pour récupérer l'état actuel du mode pixelisé
  getPixelMode(): boolean {
    return this.isPixelMode;
  }

  // Méthode pour définir l'état du mode pixelisé
  setPixelMode(value: boolean): void {
    this.isPixelMode = value;
  }
}
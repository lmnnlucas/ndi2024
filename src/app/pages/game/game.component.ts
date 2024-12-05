import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '../../shared/pop-up/pop-up.component'; 
import { JsonDataService } from '../../shared/json-data/json-data.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChild(PopupComponent) popup!: PopupComponent;
  jsonContent: any;

  constructor(private jsonService: JsonDataService) {}

  openPopUp(file: string) {
    this.jsonService.loadData(file).subscribe((data) => {
      this.jsonContent = data; 
      this.popup.openPopup();
    });
  }
}

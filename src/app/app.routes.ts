import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './pages/card/card.component';


export const routes: Routes = [
    {path: 'jeu', component: GameComponent},
    {path: 'card', component: CardComponent},
    {path: '**', component: HomeComponent}
];

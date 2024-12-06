import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './pages/card/card.component';
import { VersusComponent } from './pages/versus/versus.component';
import { IAComponent } from './pages/ia/ia.component';


export const routes: Routes = [
    {path: 'jeu', component: GameComponent},
    {path: 'card', component: CardComponent},
    {path: 'versus', component: VersusComponent},
    {path: 'ia', component: IAComponent},
    {path: '**', component: HomeComponent}
];

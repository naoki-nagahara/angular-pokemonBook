import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './Pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './Pokemon/pokemon-detail/pokemon-detail.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ChangeComponent } from './change/change.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PokemonListComponent },
  { path: 'change', component: ChangeComponent },
  { path: 'item', component: ItemListComponent },
  { path: ':id', component: PokemonDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

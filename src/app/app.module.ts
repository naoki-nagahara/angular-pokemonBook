import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './Pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './Pokemon/pokemon-detail/pokemon-detail.component';
import { TypesPipe } from './types/types.pipe';
import { ColorTypesPipe } from './types/color-types.pipe';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ChangeComponent } from './change/change.component';
import { FooterComponent } from './footer/footer.component';
import { ViewPokemon, changeImage } from './pokemon.reducer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const contains = {
  store: changeImage,
  pokeStore: ViewPokemon,
};

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    TypesPipe,
    ColorTypesPipe,
    SearchComponent,
    ItemListComponent,
    ChangeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(contains),
    FontAwesomeModule,
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

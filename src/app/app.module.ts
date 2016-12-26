import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PokemonPage } from '../pages/pokemon/pokemon';
import { PokemonDetailsPage } from '../pages/pokemon-details/pokemon-details';
import { ItemsPage } from '../pages/items/items';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    PokemonPage,
    PokemonDetailsPage,
    ItemsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    PokemonPage,
    PokemonDetailsPage,
    ItemsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

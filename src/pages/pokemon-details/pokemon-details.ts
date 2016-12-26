import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PokemonDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pokemon-details',
  templateUrl: 'pokemon-details.html'
})
export class PokemonDetailsPage {

  selectedPokemon: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.selectedPokemon = navParams.get('pokemon');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PokemonDetailsPage');
  }

}

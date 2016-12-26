import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 slides = [
    {
      title: "",
      description: "",
      image: "assets/img/iconbackground.jpg",
    },
    {
      title: "",
      description: "",
      image: "assets/img/pokebackground.jpg",
    }
  ];
  constructor(public navCtrl: NavController) {
	

  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PokemonDetailsPage } from '../pokemon-details/pokemon-details';
/*
  Generated class for the Pokemon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pokemon',
  templateUrl: 'pokemon.html'
})
export class PokemonPage {
  selectedPokemon: any;
  icons: string[];
  pokemons: Array<{title: string, note: string, icon: string}>;

  public csvItems : any;
  
  initialized_object : any;

  //file_items = '../www/assets/data/pokemon.csv';
  file_items = 'assets/data/pokemon.csv';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http : Http) {

  	this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.pokemons = [];
    for(let i = 1; i < 11; i++) {
      this.pokemons.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.initialized_object = this.pokemons;
  }

  itemTapped(event, pokemon) {
    this.navCtrl.push(PokemonDetailsPage, {
      pokemon: pokemon
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PokemonPage');
  }
 ionViewWillEnter()
  {
   this.loadCSV(this.file_items);
  }

  getPokemon(ev: any) {
    // Reset items back to all of the items
    this.csvItems = this.initialized_object;
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.csvItems = this.csvItems.filter((pokemon) => {
        return (pokemon.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  loadCSV(file_items)
  {
   this.http.get(file_items)
   .map(res => res.text())
   .subscribe((data)=>
   {
      var csv         = this.parseCSVFile(data);
      this.csvItems   = csv;
   });
  }
  parseCSVFile(str)
  {
     var arr  = [],
         obj  = [],
         row,
         col,
         c,
         quote  = false;  // true means we're inside a quoted field

     // iterate over each character, keep track of current row and column (of the returned array)
     for (row = col = c = 0; c < str.length; c++)
     {
        var cc = str[c],
            nc = str[c+1];        // current character, next character

        arr[row]        = arr[row] || [];
        arr[row][col]   = arr[row][col] || '';

        /* If the current character is a quotation mark, and we're inside a
     quoted field, and the next character is also a quotation mark,
     add a quotation mark to the current column and skip the next character
        */
        if (cc == '"' && quote && nc == '"')
        {
           arr[row][col] += cc;
           ++c;
           continue;
        }
        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"')
        {
           quote = !quote;
           continue;
        }
        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote)
        {
           ++col;
           continue;
        }
        /* If it's a newline and we're not in a quoted field, move on to the next
           row and move to column 0 of that new row */
        if (cc == '\n' && !quote)
        {
           ++row;
           col = 0;
           continue;
        }
        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
     }

     return this.formatParsedObject(arr, true);
  }

  formatParsedObject(arr, hasTitles)
  {
     let id,
         name,
         type1,
         type2,
         abil1,
         abil2,
         abilH,
         hp,
         attack,
         defense,
         spattack,
         spdefense,
         speed,
         total,
         weight,
         height,
         dex1,
         dex2,
         summary,
         male,
         female,
         pre_ev,
         egg1,
         egg2,

         obj = [];

     for(var j = 0; j < arr.length; j++)
     {
        var items       = arr[j];

        if(items.indexOf("") === -1)
        {
           if(hasTitles === true && j === 0)
           {
              id         = items[0];
              name      = items[2];
              type1    = items[4];
              type2        = items[5];
              abil1 = items[6];
             abil2 = items[7]; 
             abilH = items[8];
             hp = items[9];
             attack = items[10];
             defense = items[11];
             spattack = items[12];
             spdefense = items[13];
             speed = items[14];
             total = items[15];
             weight = items[16];
             height = items[17];
             dex1 = items[18];
             dex2 = items[19];
             summary = items[20];
             male = items[21];
             female = items[22];
             pre_ev = items[23];
             egg1 = items[24];
             egg2 = items[25];
           }
           else
           {
              obj.push({
                 id       : items[0],
                 name    : items[2],
                 type1    : items[4],
                 type2    : items[5],
                 abil1 : items[6],
                 abil2 : items[7], 
                 abilH : items[8],
                 hp : items[9],
                 attack : items[10],
                 defense : items[11],
                 spattack : items[12],
                 spdefense : items[13],
                 speed : items[14],
                 total : items[15],
                 weight : items[16],
                 height : items[17],
                 dex1 : items[18],
                 dex2 : items[19],
                 summary : items[20],
                 male : items[21],
                 female : items[22],
                 pre_ev : items[23],
                 egg1 : items[24],
                 egg2 : items[25]
                  });
           }
        }
     }
     this.initialized_object = obj;
     return obj;
  }
  

}

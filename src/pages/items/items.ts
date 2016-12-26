import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Items page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-items',
  templateUrl: 'items.html'
})
export class ItemsPage {

  public csvItems : any;

  initialized_object : any;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  pokeballs: Array<{name: string, effect: string, location: string, icon: string}>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http : Http) {

      var pokeball_names=["Beast Ball","Cherish Ball","Dive Ball","Dusk Ball","Fast Ball","Friend Ball","Great Ball","Heal Ball","Heavy Ball","Level Ball","Love Ball","Lure Ball","Luxury Ball","Master Ball","Moon Ball","Nest Ball","Net Ball","Poke Ball","Premier Ball","Quick Ball","Repeat Ball","Timer Ball","Ultra Ball"];
      var poke_effect=["A special Poké Ball designed to catch Ultra Beasts. It has a low success rate for catching others.","A quite rare Poké Ball that has been crafted in order to commemorate a special occasion of some sort.","A somewhat different Poké Ball that works especially well when catching Pokémon that live underwater.","A somewhat different Poké Ball that makes it easier to catch wild Pokémon at night or in dark places like caves.","A Poké Ball that makes it easier to catch Pokémon that are usually very quick to run away.","A strange Poké Ball that will make the wild Pokémon caught with it more friendly toward you immediately.","A good, high-performance Poké Ball that provides a higher Pokémon catch rate than a standard Poké Ball.","A remedial Poké Ball that restores the HP of a Pokémon caught with it and eliminates any status conditions.","A Poké Ball that is better than usual at catching very heavy Pokémon.","A Poké Ball that makes it easier to catch Pokémon that are at a lower level than your own Pokémon.","A Poké Ball that works best when catching a Pokémon that is of the opposite gender of your Pokémon.","A Poké Ball that is good for catching Pokémon that you reel in with a Rod while out fishing.","A particularly comfortable Poké Ball that makes a wild Pokémon quickly grow friendlier after being caught.","The best Poké Ball with the ultimate level of performance. With it, you will catch any wild Pokémon without fail.","A Poké Ball that will make it easier to catch Pokémon that can evolve using a Moon Stone.","A somewhat different Poké Ball that becomes more effective the lower the level of the wild Pokémon.","A somewhat different Poké Ball that is more effective when attempting to catch Water- or Bug-type Pokémon.","A device for catching wild Pokémon. It’s thrown like a ball at a Pokémon, comfortably encapsulating its target.","A somewhat rare Poké Ball that was made as a commemorative item used to celebrate an event of some sort.","A somewhat different Poké Ball that has a more successful catch rate if used at the start of a wild encounter.","A somewhat different Poké Ball that works especially well on a Pokémon species that has been caught before.","A somewhat different Poké Ball that becomes progressively more effective the more turns that are taken in battle.","An ultra-high-performance Poké Ball that provides a higher success rate for catching Pokémon than a Great Ball."];
      var poke_locations=["Route 2, Route 8, Route 13, Aether Paradise, Seafolk Village",,"Route 8, Route 15, Brooklet Hill, Hano Beach, Kala'e Bay","Festival Plaza","Shop","Route 8","Route 14, Diglett's Tunnel, Memorial Hill, Vast Poni Canyon","Festival Plaza","Shop","Route 8","Mount Hokulani","Malie City","Route 1, Route 1, Route 4, Hau'oli Cemetery, Hau'oli City, Melemele Meadow, Ten Carat Hill, Verdant Cavern","Festival Plaza","PickUp Item","Shop","Route 1, Route 2, Route 5, Route 8, Route 16, Hau'oli City, Heahea City, Konikoni City, Malie City, Mount Hokulani, Paniola Town, Pokemon League, Royal Avenue, Royal Avenue, Seafolk Village, Tapu Village","Route 2, Route 3, Hau'oli City, Paniola Ranch, Seaward Cave","Festival Plaza","Shop","Route 2, Royal Avenue","Mount Hokulani","Mount Hokulani","Malie City","Blush Mountain","Route 15, Malie Garden","Festival Plaza","Shop","Route 2","Aether Paradise, Hau'oli City","Festival Plaza","Mount Hokulani","Route 1, Route 2, Route 3, Lush Jungle","Festival Plaza","Shop","Route 2, Royal Avenue","Route 7, Route 9, Brooklet Hill, Kala'e Bay, Melemele Meadow","Festival Plaza","Shop","Paniola Town","Route 1, Route 1, Hau'oli City","Festival Plaza","Shop","Route 1, Route 2, Route 5, Route 8, Route 16, Hau'oli City, Heahea City, Konikoni City, Malie City, Mount Hokulani, Paniola Town, Pokemon League, Royal Avenue, Royal Avenue, Seafolk Village, Tapu Village",,"Route 11, Paniola Town, Wela Volcano Park","Festival Plaza","Shop","Route 8","Poni Wilds, Ula'ula Meadow","Festival Plaza","Shop","Paniola Town","Blush Mountain","Festival Plaza","Shop","Paniola Town, Royal Avenue","Route 8, Hau'oli City, Royal Avenue, Tapu Village","Festival Plaza","PickUp Item","Shop","Route 1, Route 2, Route 5, Route 8, Route 16, Hau'oli City, Heahea City, Konikoni City, Malie City, Mount Hokulani, Paniola Town, Pokemon League, Royal Avenue, Seafolk Village, Tapu Village"];

      this.pokeballs =[];
      var reg = /^[a-z]+$/i;

      for (var index=0; index<pokeball_names.length; index++){
        var ball_name = pokeball_names[index].toLowerCase().replace(/ /g,'');
        //console.log(ball_name);

        this.pokeballs.push({
          name: pokeball_names[index],
          effect: poke_effect[index],
          location: poke_locations[index],
          icon: 'http://www.serebii.net/itemdex/sprites/'+ball_name+'.png'
        });
      }
      this.initialized_object = this.pokeballs;
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  
  }

  ionViewWillEnter()
  {
   //this.loadCSV();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.pokeballs = this.initialized_object;
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.pokeballs = this.pokeballs.filter((ball) => {
        return (ball.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  loadCSV()
  {
   this.http.get('/assets/data/items.csv')
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
         title,
         publisher,
         genre,
         obj = [];

     for(var j = 0; j < arr.length; j++)
     {
        var items       = arr[j];

        if(items.indexOf("") === -1)
        {
           if(hasTitles === true && j === 0)
           {
              id         = items[0];
              title      = items[1];
              publisher    = items[2];
              genre        = items[3];
           }
           else
           {
              obj.push({
                 id       : items[0],
                 title    : items[1],
                 publisher    : items[2],
                 genre    : items[3]
              });
           }
        }
     }
     this.initialized_object = obj;
     return obj;
  }
}

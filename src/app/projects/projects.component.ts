import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { AppComponent } from '../app.component';
import { LoadingService } from '../loading.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
apps;
type = 'all';

  constructor(public appComponent: AppComponent, public loadingService: LoadingService) {
    this.appComponent.title = "projects";
    this.apps = [
      { name: "Tetris Game", img: "assets/images/tetris.png", link: "http://arpit-banati.epizy.com/tetris-game/", t: "games" },
      { name: "Snake Game", img: "assets/images/snake.png", link: "http://arpit-banati.epizy.com/Snake%20Game/", t: "games" },
      { name: "MEAN Notes App", img: "assets/images/MEAN-notes.png", link: "https://angular-node-mysql-notes.herokuapp.com", t: "utilities" },
      { name: "Stopwatch", img: "assets/images/stopwatch.png", link: "http://arpit-banati.epizy.com/Stopwatch-App/", t: "utilities" },
      { name: "Google homepage", img: "assets/images/google.png", link: "http://arpit-banati.epizy.com/Google-copy/Google%20project/app/", t: "extras" },
      { name: "Hide YouTube end cards(chrome extension)", img: "assets/images/end_cards.png", link: "https://chrome.google.com/webstore/detail/hide-youtube-end-cards/jinenhpepbpkepablpjjchejlabbpken", t: "utilities" },      
      { name: "Facebook Homepage", img: "assets/images/facebook.png", link: "http://arpit-banati.epizy.com/Facebook-copy/Facebook%20project/", t: "extras" },
      { name: "Click Counter", img: "assets/images/clickcounter.png", link: "http://arpit-banati.epizy.com/Click-Counter/click%20counter/", t: "utilities" },
      { name: "Fruit Slice Game", img: "assets/images/fruitslice.png", link: "http://arpit-banati.epizy.com/Fruit-Slice-Game/", t: "games" },
      { name: "Reader App", img: "assets/images/reader.png", link: "http://arpit-banati.epizy.com/Reader-App/", t: "utilities" },
      { name: "Web Dev Course", img: "assets/images/web_course.png", link: "http://arpit-banati.epizy.com/Course-Website/", t: "extras" },
      { name: "Maths Quiz", img: "assets/images/mathsgame.png", link: "http://arpit-banati.epizy.com/Maths-Game-Website/", t: "games" },
      { name: "Barebone Google Map", img: "assets/images/googlemap.png", link: "http://arpit-banati.epizy.com/New Barebone Directions App/", t: "utilities" },
      { name: "Drawing App", img: "assets/images/draw.png", link: "http://arpit-banati.epizy.com/Drawing-App/", t: "utilities" },
      { name: "Catch The Mole", img: "assets/images/mole_game.png", link: "http://arpit-banati.epizy.com/Mole-in-the-hole/", t: "games" },
      { name: "Notes App", img: "assets/images/notes.png", link: "http://arpit-banati.epizy.com/Notes-App/", t: "utilities" },
      { name: "Catch the Egg", img: "assets/images/hengame.png", link: "http://arpit-banati.epizy.com/catch-the-egg/", t: "games" },
      { name: "WWE Social", img: "assets/images/wwe.png", link: "http://arpit-banati.epizy.com/Social-Plugins/", t: "extras" },
      { name: "Bootsrap Form", img: "assets/images/form.png", link: "http://arpit-banati.epizy.com/Bootstrap-form/", t: "extras" },
      { name: "App landing page", img: "assets/images/applanding.png", link: "http://arpit-banati.epizy.com/App-Landing-Page/", t: "extras" },
      { name: "Maths Tutorial", img: "assets/images/maths_course.png", link: "http://arpit-banati.epizy.com/Maths-Tutorial-website/", t: "extras" }
    ];

  }

  ngOnInit() {
    var global = this;
    var width = window.innerWidth;
    $(window).resize(function(){
      width = window.innerWidth;
    })
    $("#tabs a div.all").mouseover(function () {
      console.log('hh')
      if (global.type != 'all' && width > 767) {
        $("#tabs a div.all").addClass("tabs_hover");
      }
    })
    $("#tabs a div.all").mouseleave(function () {
      $("#tabs a div.all").removeClass("tabs_hover");
    })

    $("#tabs a div.games").mouseover(function () {
      if (global.type != 'games' && width > 767) {
        $("#tabs a div.games").addClass("tabs_hover");
      }
    })
    $("#tabs a div.games").mouseleave(function () {
      $("#tabs a div.games").removeClass("tabs_hover");
    })

    $("#tabs a div.utilities").mouseover(function () {
      if (global.type != 'utilities' && width > 767) {
        $("#tabs a div.utilities").addClass("tabs_hover");
      }
    })
    $("#tabs a div.utilities").mouseleave(function () {
      $("#tabs a div.utilities").removeClass("tabs_hover");
    })

    $("#tabs a div.extras").mouseover(function () {
      if (global.type != 'extras' && width > 767) {
        $("#tabs a div.extras").addClass("tabs_hover");
      }
    })
    $("#tabs a div.extras").mouseleave(function () {
      $("#tabs a div.extras").removeClass("tabs_hover");
    })

    
  }


  showAll() {
    this.type = "all";
  }
  showGames() {
    this.type = "games";
  }
  showUtilities() {
    this.type = "utilities";
  }
  showExtras() {
    this.type = "extras";
  }


}

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
      { name: "Catch The Mole", img: "assets/images/mole_game.png", link: "./../../assets/Mole-in-the-hole/index.html", t: "games" },
      { name: "Tutorialspoint PDF", img: "assets/images/tutorialspoint-pdf.png", link: "https://github.com/banatiarpit97/tutorialspoint-pdf-download", t: "utilities" },
      { name: "Snake Game", img: "assets/images/snake.png", link: "./../../assets/Snake%20Game/index.html", t: "games" },
      { name: "MEAN Notes App", img: "assets/images/MEAN-notes.png", link: "https://angular-node-mysql-notes.herokuapp.com", t: "utilities" },
      { name: "Stopwatch", img: "assets/images/stopwatch.png", link: "./../../assets/Stopwatch-App/index.html", t: "utilities" },
      { name: "Google homepage", img: "assets/images/google.png", link: "./../../assets/Google-copy/Google%20project/app/index.html", t: "extras" },
      { name: "Hide YouTube end cards(chrome extension)", img: "assets/images/end_cards.png", link: "https://chrome.google.com/webstore/detail/hide-youtube-end-cards/jinenhpepbpkepablpjjchejlabbpken", t: "utilities" },
      { name: "Chat App", img: "assets/images/chat.png", link: "https://banati-chat.herokuapp.com", t: "utilities" },
      { name: "Click Counter", img: "assets/images/clickcounter.png", link: "./../../assets/Click-Counter/click%20counter/index.html", t: "utilities" },
      { name: "Fruit Slice Game", img: "assets/images/fruitslice.png", link: "./../../assets/Fruit-Slice-Game/index.html", t: "games" },
      { name: "Reader App", img: "assets/images/reader.png", link: "./../../assets/Reader-App/index.html", t: "utilities" },
      { name: "Web Dev Course", img: "assets/images/web_course.png", link: "./../../assets/Course-Website/index.html", t: "extras" },
      { name: "Maths Quiz", img: "assets/images/mathsgame.png", link: "./../../assets/Maths-Game-Website/index.html", t: "games" },
      { name: "Barebone Google Map", img: "assets/images/googlemap.png", link: "http://arpit-banati.epizy.com/New Barebone Directions App/", t: "utilities" },
      { name: "Drawing App", img: "assets/images/draw.png", link: "./../../assets/Drawing-App/index.html", t: "utilities" },
      { name: "Tetris Game", img: "assets/images/tetris.png", link: "./../../assets/tetris-game/index.html", t: "games" },
      { name: "Notes App", img: "assets/images/notes.png", link: "http://arpit-banati.epizy.com/Notes-App/", t: "utilities" },
      { name: "Facebook Homepage", img: "assets/images/facebook.png", link: "http://arpit-banati.epizy.com/Facebook-copy/Facebook%20project/", t: "extras" },
      { name: "Catch the Egg", img: "assets/images/hengame.png", link: "./../../assets/catch-the-egg/index.html", t: "games" },
      { name: "WWE Social", img: "assets/images/wwe.png", link: "./../../assets/Social-Plugins/index.html", t: "extras" },
      { name: "Bootsrap Form", img: "assets/images/form.png", link: "http://arpit-banati.epizy.com/Bootstrap-form/", t: "extras" },
      { name: "App landing page", img: "assets/images/applanding.png", link: "./../../assets/App-Landing-Page/index.html", t: "extras" },
      { name: "Maths Tutorial", img: "assets/images/maths_course.png", link: "./../../assets/Maths-Tutorial-website/index.html", t: "extras" }
    ];

  }

  ngOnInit() {
    const global = this;
    let width = window.innerWidth;
    $(window).resize(function() {
      width = window.innerWidth;
    });
    $("#tabs a div.all").mouseover(function () {
      if (global.type !== 'all' && width > 767) {
        $("#tabs a div.all").addClass("tabs_hover");
      }
    });
    $("#tabs a div.all").mouseleave(function () {
      $("#tabs a div.all").removeClass("tabs_hover");
    });

    $("#tabs a div.games").mouseover(function () {
      if (global.type !== 'games' && width > 767) {
        $("#tabs a div.games").addClass("tabs_hover");
      }
    });
    $("#tabs a div.games").mouseleave(function () {
      $("#tabs a div.games").removeClass("tabs_hover");
    });

    $("#tabs a div.utilities").mouseover(function () {
      if (global.type !== 'utilities' && width > 767) {
        $("#tabs a div.utilities").addClass("tabs_hover");
      }
    });
    $("#tabs a div.utilities").mouseleave(function () {
      $("#tabs a div.utilities").removeClass("tabs_hover");
    });

    $("#tabs a div.extras").mouseover(function () {
      if (global.type !== 'extras' && width > 767) {
        $("#tabs a div.extras").addClass("tabs_hover");
      }
    });
    $("#tabs a div.extras").mouseleave(function () {
      $("#tabs a div.extras").removeClass("tabs_hover");
    });
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

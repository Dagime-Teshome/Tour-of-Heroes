import { Component, OnInit } from '@angular/core';
import {Heroes} from "../heroes";
import {HEROES} from "../Mock-Heroes";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes=HEROES;
 
  constructor() { }

  ngOnInit() {
  }

 
  selectedHero: Heroes;
onSelect(hero: Heroes): void {
  this.selectedHero = hero;
}

}

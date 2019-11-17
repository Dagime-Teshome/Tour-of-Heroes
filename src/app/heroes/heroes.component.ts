import { Component, OnInit } from '@angular/core';
import {Heroes} from "../heroes";
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';




@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Heroes[];
  selectedHero: Heroes;
  constructor(private heroService: HeroService ) { }

  ngOnInit() {
    this.getHeroes();
  }

 
 
onSelect(hero: Heroes): void {
  this.selectedHero = hero;
}
getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}

}

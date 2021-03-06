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
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Heroes)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}
delete(hero: Heroes): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero).subscribe();
}

}

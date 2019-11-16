import { Component, OnInit } from '@angular/core';
import {Heroes} from "../heroes"


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Heroes={
    id:1,
    name:'Wind-Storm'
  }
  constructor() { }

  ngOnInit() {
  }

  change() {
    this.hero.name = 'changed';
  }

}

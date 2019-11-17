import { Component, OnInit,Input } from '@angular/core';
import { Heroes } from '../heroes';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {

  @Input() hero :Heroes;
  constructor() { }

  ngOnInit() {
  }

}

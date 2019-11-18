import { Injectable } from '@angular/core';
import { Heroes } from './heroes';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private messageservice:MessageService) { }
  getHero(id: number): Observable<Heroes> {
    // TODO: send the message _after_ fetching the hero
    this.messageservice.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}

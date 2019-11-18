import { Injectable } from '@angular/core';
import { Heroes } from './heroes';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(  private http: HttpClient, private messageservice:MessageService) { }
  getHeroes(): Observable<Heroes[]> {
    this.messageservice.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  getHero(id: number): Observable<Heroes> {
    // TODO: send the message _after_ fetching the hero
    this.messageservice.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
  private log(message: string) {
    this.messageservice.add(`HeroService: ${message}`);
  }
}

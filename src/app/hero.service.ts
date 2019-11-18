import { Injectable } from '@angular/core';
import { Heroes } from './heroes';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(  private http: HttpClient, private messageservice:MessageService) { }
  
   
  private log(message: string) {
    this.messageservice.add(`HeroService: ${message}`);
    
  }
  getHeroes (): Observable<Heroes[]> {
    return this.http.get<Heroes[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Heroes[]>('getHeroes', []))
      );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getHero(id: number): Observable<Heroes> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Heroes>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Heroes>(`getHero id=${id}`))
    );
  }
  updateHero (hero: Heroes): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero (hero: Heroes): Observable<Heroes> {
    return this.http.post<Heroes>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Heroes) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Heroes>('addHero'))
    );
  }
  deleteHero (hero: Heroes | number): Observable<Heroes> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Heroes>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Heroes>('deleteHero'))
    );
  }
  searchHeroes(term: string): Observable<Heroes[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Heroes[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Heroes[]>('searchHeroes', []))
    );
  }
}

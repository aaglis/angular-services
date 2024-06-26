import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

interface Task {
  id: string,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient)
  private url = environment.apiUlr

  public httpListItems$(): Observable<Task[]> {
    console.log('chamou API service DEFAULT')
    return this.http.get<Task[]>(this.url)
  }

  private itemId$ = new Subject<Task | null>
  get getItemId() {
    return this.itemId$.asObservable()
  }

  public httpItemID$(id: string): Observable<Task> {
    this.itemId$.next(null)
    console.log('chamou API service DEFAULT: buscando item pelo id')
    return this.http.get<Task>(`${this.url}${id}`)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

  private itemId$ = new Subject<Task | null>()
  private itemIdStatus$ = new Subject<string>()
  get getItemId() {
    return this.itemId$.asObservable()
  }

  get getItemIdStatus() {
    return this.itemIdStatus$.asObservable()
  }

  public httpItemID$(id: string) {
    console.log('chamou API service DEFAULT: buscando item pelo id')
    this.http.get<Task>(`${this.url}${id}`).subscribe({
      next: (item) => this.itemId$.next(item),
      error: (error) =>  {
        this.itemId$.next(null)
        console.log(error.status, error.message)
        this.itemIdStatus$.next('Item não encontrado. ID inválido.')
      },
      complete: () => {
        console.log('item foi encontrado')
        this.itemIdStatus$.next('')
      }
    })
  }

}

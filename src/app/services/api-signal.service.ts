import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';

interface Task {
	id: string,
	title: string
}

@Injectable({
	providedIn: 'root'
})
export class ApiSignalService {

	private http = inject(HttpClient)
	private url = signal(environment.apiUlr)

  //buscando todos os itens da API
  private setListItems = signal<Task[] | null>(null)
  get getListItems() {
    return this.setListItems.asReadonly()
  }

	listItems$(): Observable<Task[]> {
    console.log('chamou API service SIGNAL')
		return this.http.get<Task[]>(this.url()).pipe(
			take(1),
      tap((res) => this.setListItems.set(res))
		)
	}

  //bucando um item da API pelo ID
  private setItemById = signal<Task | null>(null)
  get getItemById() {
    return this.setItemById.asReadonly()
  }

  getItemById$(id: string): Observable<Task> {
    this.setItemById.set(null)

    console.log('chamou API service SIGNAL: Buscando pelo id')
		return this.http.get<Task>(`${this.url()}${id}`).pipe(
			take(1),
      tap((res) => this.setItemById.set(res))
		)
	}
}

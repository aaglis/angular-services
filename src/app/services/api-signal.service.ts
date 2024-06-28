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
    console.log('chamou API service SIGNAL: LIST ITEMS')
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

  private criatedItem = signal<Task | null>(null)
  get getCriatedItem() {
    return this.criatedItem.asReadonly()
  }

  postItem(title: string) {
    console.log('chamou API service SIGNAL: criando novo item')
    return this.http.post<Task>(this.url(), {title}).subscribe({
      next: (item) => {
        console.log(item)
        this.criatedItem.set(item)
        this.listItems$().subscribe()
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('item criado')
      }
    })
  }

  private updatedItem = signal<Task | null>(null)
  get getUpdatedItem() {
    return this.updatedItem.asReadonly()
  }

  updateItem(id: string, title: string) {
    console.log('chamou API service SIGNAL: atualizando item')
    return this.http.patch<Task>(`${this.url()}${id}`, { title }).subscribe({
      next: (item) => {
        console.log(item)
        this.updatedItem.set(item)
        this.listItems$().subscribe()
      },
      error: (error) => error,
      complete: () => console.log('item atualizado com sucesso!')
    })
  }

  private deletedItem = signal<Task | null>(null)
  get getdeletedItem() {
    return this.deletedItem.asReadonly()
  }

  deleteItem(id: string) {
    console.log('chamou API service SIGNAL: deletando item')
    return this.http.delete(`${this.url()}${id}`, {}).pipe(take(1)).subscribe({
      error: (error) => console.log(error),
      complete: () => {
        this.listItems$().subscribe()
      }
    })
  }

}

import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap, throwError } from 'rxjs';

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

	listItems$() {
    console.log('chamou API service SIGNAL: LIST ITEMS')
		return this.http.get<Task[]>(this.url()).pipe(
			take(1)).subscribe({
        next: (list) => this.setListItems.set(list),
        error: (error) => console.log(error),
        complete: () => console.log('busca da lista completada')
      })
	}

  //bucando um item da API pelo ID
  private setItemById = signal<Task | null>(null)
  get getItemById() {
    return this.setItemById.asReadonly()
  }

  private itemIdError = signal<string | null>(null)
  get getItemIdError() {
    return this.itemIdError.asReadonly()
  }

  getItemById$(id: string) {
    this.setItemById.set(null)
    this.itemIdError.set(null)

    console.log('chamou API service SIGNAL: Buscando pelo id')
		return this.http.get<Task>(`${this.url()}/${id}`).pipe(
			take(1),
      tap({
        next: (item) => this.setItemById.set(item),
        error: (error) => this.itemIdError.set(error.error.message),
        complete: () => console.log('item achado com sucesso.')
      })
    )
	}

  private createdItem = signal<Task | null>(null)
  get getCreatedItem() {
    return this.createdItem.asReadonly()
  }

  private setCreateItemError = signal<string | null>(null)
  get getCreateError() {
    return this.setCreateItemError.asReadonly()
  }

  postItem(title: string) {
    this.createdItem.set(null)
    this.setCreateItemError.set(null)

    console.log('chamou API service SIGNAL: criando novo item')
    return this.http.post<Task>(this.url(), {title}).pipe(
      take(1),
      tap({
        next: (item) => {
          this.createdItem.set(item)
          this.listItems$()
        },
        error: (error) => {
          console.log('ta caindo no erro')
          this.setCreateItemError.set(error.error.message)
        },
        complete: () => console.log('item criado com sucesso!')
      })
    )
  }

  private updatedItem = signal<Task | null>(null)
  get getUpdatedItem() {
    return this.updatedItem.asReadonly()
  }

  private updatedItemError = signal<string | null>(null)
  get getUpdatedItemError() {
    return this.updatedItemError.asReadonly()
  }

  updateItem(id: string, title: string) {
    console.log('chamou API service SIGNAL: atualizando item')

    this.updatedItem.set(null)
    this.updatedItemError.set(null)

    return this.http.patch<Task>(`${this.url()}/${id}`, { title }).pipe(
      take(1),
      tap({
        next: (item) => {
          this.updatedItem.set(item)
          this.listItems$()
        },
        error: (error) => {
          this.updatedItemError.set(error.error.message)
        },
        complete: () => console.log('item atualizado com sucesso!')
      })
    )
  }

  private deletedItem = signal<Task | null>(null)
  get getdeletedItem() {
    return this.deletedItem.asReadonly()
  }

  private deletedItemError = signal<string | null>(null)
  get getDeletedItemError() {
    return this.deletedItemError.asReadonly()
  }

  deleteItem(id: string) {
    this.deletedItem.set(null)
    this.deletedItemError.set(null)

    console.log('chamou API service SIGNAL: deletando item')
    return this.http.delete(`${this.url()}/${id}`, {}).pipe(
      take(1),
      tap({
        next: () => this.listItems$(),
        error: (error) => {
          console.log(error.error.message)
          this.deletedItemError.set(error.error.message)
        },
        complete: () => console.log('item deletado com sucesso!')
      })
    )
  }

}

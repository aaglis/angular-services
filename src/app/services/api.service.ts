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

  private listChanges$ = new Subject<void>()
  get getlistUpdate() {
    return this.listChanges$.asObservable()
  }

  public httpListItems$(): Observable<Task[]> {
    console.log('chamou API service DEFAULT')
    return this.http.get<Task[]>(this.url)
  }

  private itemId$ = new Subject<Task | null>()
  get getItemId() {
    return this.itemId$.asObservable()
  }

  private itemIdStatus$ = new Subject<string | null>()
  get getItemIdStatus() {
    return this.itemIdStatus$.asObservable()
  }

  public httpItemID$(id: string) {
    console.log('chamou API service DEFAULT: buscando item pelo id')

    if(!id){
      id = 'lerolero'
    }

    this.itemId$.next(null)
    this.itemIdStatus$.next(null)

    this.http.get<Task>(`${this.url}/${id}`).subscribe({
      next: (item) => this.itemId$.next(item),
      error: (error) =>  {
        console.log(error.status, error.message)
        this.itemIdStatus$.next(error.error.message)
      },
      complete: () => {
        console.log('item foi encontrado')
      }
    })
  }

  private createdItem$ = new Subject<Task | null>()
  get getCreatedItem() {
    return this.createdItem$.asObservable()
  }

  private createdItemStatus$ = new Subject<string | null>()
  get getCreatedItemStatus() {
    return this.createdItemStatus$.asObservable()
  }

  public httpPostItem(title: string) {
    console.log('chamou API service DEFAULT: criando novo item')

    this.createdItem$.next(null)
    this.createdItemStatus$.next(null)

    this.http.post<Task>(this.url, {title}).subscribe({
      next: (item) => {
        console.log(item)
        this.createdItem$.next(item)
        this.listChanges$.next()
      },
      error: (error) => {
        console.log(error)
        this.createdItemStatus$.next(error.error.message)
      }
    })
  }

  private updatedItem$ = new Subject<Task | null>()
  get getUpdatedItem() {
    return this.updatedItem$.asObservable()
  }

  private updatedItemStatus$ = new Subject<string | null>()
  get getUpdatedItemStatus() {
    return this.updatedItemStatus$.asObservable()
  }

  public httpUpdateItem(id: string, title: string) {
    console.log('chamou API service DEFAULT: atualizando um item existente')

    this.updatedItem$.next(null)
    this.updatedItemStatus$.next(null)

    return this.http.patch<Task>(`${this.url}/${id}`, { title }).subscribe({
      next: (item) => {
        this.updatedItem$.next(item)
        this.listChanges$.next()
      },
      error: (error) => {
        console.log(error)
        this.updatedItemStatus$.next(error.error.message)
      },
      complete: () => console.log('item atualizado com sucesso!')
    })
  }

  private deletedItem$ = new Subject<Task| null>()
  get getDeletedItem() {
    return this.deletedItem$.asObservable()
  }

  public httpDeleteItem(id: string) {
    console.log('chamou API service DEFAULT: deletando um item existente')
    return this.http.delete<Task>(`${this.url}/${id}`).subscribe({
      next: (item) => {
        this.deletedItem$.next(item)
        this.listChanges$.next()
      },
      error: (error) => console.log(error),
      complete: () => console.log('item deletado com sucesso!')
    })
  }

}

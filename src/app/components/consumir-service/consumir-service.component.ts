import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, startWith, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-consumir-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumir-service.component.html',
  styleUrl: './consumir-service.component.scss'
})
export class ConsumirServiceComponent {
  /*
  INJEÇÃO DE DEPENDÊNCIA
  forma antiga:
  constructor(private apiService$: ApiService) {}
  */
  //forma nova:
  private apiService = inject(ApiService)


  //RESGATANDO DADOS DE UMA API

  /*
    FORMA 1:
    insiro em uma variavel o observable, deixando o próprio angular
    resgatar os dados e inserir eles no html usando o | async
  */
  listItems$: Observable<{ id: string, title: string}[]>

  constructor() {
    // Inicializa a lista de itens e escuta as mudanças
    this.listItems$ = this.apiService.getlistUpdate.pipe(
      startWith(null),
      switchMap(() => this.apiService.httpListItems$())
    )
  }

  itemId$ = this.apiService.getItemId
  itemId: {id: string, title: string} | null = null

  itemIsStatus$ = this.apiService.getItemIdStatus
  itemIdStatus: string | null = ''

  searchItemId(id: string) {
    console.log('busca DEFAULT chamada:')
    this.apiService.httpItemID$(id)
    this.itemId$.subscribe(item => {
      this.itemId = item
    })
    this.itemIsStatus$.subscribe(statusError => {
      this.itemIdStatus = statusError
    })
  }

  createdItem$ = this.apiService.getCreatedItem
  createdItem: {id: string, title: string} | null = null

  createdItemStatus$ = this.apiService.getCreatedItemStatus
  createdItemStatus: string | null = null

  postItem(title: string) {
    console.log('criação DEFAULT chamada:')
    this.apiService.httpPostItem(title)
    this.createdItem$.subscribe(item => this.createdItem = item)
    this.createdItemStatus$.subscribe(statusError => this.createdItemStatus = statusError)
  }

  updatedItem$ = this.apiService.getUpdatedItem
  updatedItem: {id: string, title: string} | null = null

  updatedItemStatus$ = this.apiService.getUpdatedItemStatus
  updatedItemStatus: string | null = null

  updateItem(id: string, title: string) {
    console.log('update DEFAULT chamado:')
    this.apiService.httpUpdateItem(id, title)
    this.updatedItem$.subscribe(item => this.updatedItem = item)
    this.updatedItemStatus$.subscribe(statusError => this.updatedItemStatus = statusError)
  }

  deleteItem(id: string) {
    console.log('delete DEFAULT chamado:')
    this.apiService.httpDeleteItem(id)
  }

 /*
    FORMA 2:
    crio uma variavel do tipo de acordo com api
    (no caso, um array de objetos), faço o resgate
    dos dados em um hook (OnInit, por exemplo), e
    insiro os dados na variável

    listItems: Array<{id: string, title: string}> = []

    ngOnInit(): void {
      this.apiService.httpListItems$().subscribe( data => {
        console.log(data)
        this.listItems = data
      })
    }

 */
}

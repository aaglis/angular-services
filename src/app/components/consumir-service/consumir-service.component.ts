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
  itemIdStatus: string = ''

  searchItemId(id: string) {
    console.log('busca DEFAULT chamada:')
    this.apiService.httpItemID$(id)
    this.itemId$.subscribe(item => {
      this.itemId = item
    })
    this.itemIsStatus$.subscribe(text => {
      this.itemIdStatus = text
    })
  }

  postItem(title: string) {
    console.log('criação DEFAULT chamada:')
    this.apiService.httpPostItem(title)
  }

  updateItem(id: string, title: string) {
    console.log('update DEFAULT chamado:')
    this.apiService.httpUpdateItem(id, title)
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

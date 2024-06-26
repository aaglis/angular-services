import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

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
  listItems$ = this.apiService.httpListItems$().pipe(take(1))

  itemId: {id:string, title: string} | null = null

  itemIdStatus = ''

  searchItemId(id: string) {
    console.log('busca DEFAULT chamada:')
    this.apiService.httpItemID$(id).subscribe({
      next: (value) => {
        this.itemId = value
      },
      error: (error) => {
        console.log(error.status, error.message)
        this.itemIdStatus = 'item não encontrado: id inválido.'
      },
      complete: () => {
        console.log('item foi achado')
      }
    })
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

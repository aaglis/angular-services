import { Component, inject } from '@angular/core';
import { ApiSignalService } from '../../services/api-signal.service';

@Component({
  selector: 'app-consumir-service-signal',
  standalone: true,
  imports: [],
  templateUrl: './consumir-service-signal.component.html',
  styleUrl: './consumir-service-signal.component.scss'
})
export class ConsumirServiceSignalComponent {
  private apiServiceSignal = inject(ApiSignalService)

  listItems = this.apiServiceSignal.getListItems
  getItemById = this.apiServiceSignal.getItemById

  statusItem = ''

  constructor() {
    this.apiServiceSignal.listItems$().subscribe()
  }

  getIdItem(id: string) {
    console.log('INICIADO: BUSCA DE ITEM PELO ID')
    this.apiServiceSignal.getItemById$(id).subscribe({
      error: (error) => {
        console.log(error.status, error.message)
        this.statusItem = 'Item não encontrado: ID inválido.'
      },
      complete: () => {
        console.log('item foi achado')
        this.statusItem = ''
      }
    })
  }

  createItem(title: string) {
    console.log('INICIADO: CRIAÇÃO DE UM NOVO ITEM')
    this.apiServiceSignal.postItem(title)
  }

  updateItem(id: string, title: string) {
    console.log('INICIADO: ATUALIZAÇÃO DE UM ITEM EXITENTE')
    this.apiServiceSignal.updateItem(id, title)
  }

  deleteItem(id: string) {
    console.log('INICIADO: DELETAR UM ITEM EXISTENTE')
    this.apiServiceSignal.deleteItem(id)
  }
}

import { Component, inject, signal } from '@angular/core';
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

  // get item by ID and status(error)
  getItemById = this.apiServiceSignal.getItemById
  statusItem = signal<string | null>(null)

  statusCreatedItem = signal<string | null>(null)

  statusUpdatedItem = signal<string | null>(null)

  statusDeletedItem = signal<string | null>(null)

  constructor() {
    this.apiServiceSignal.listItems$()
  }

  getIdItem(id: string) {
    if(!id) {
      id = 'lerolero'
    }
    console.log('INICIADO: BUSCA DE ITEM PELO ID')
    this.apiServiceSignal.getItemById$(id).subscribe({
      next: () => this.statusItem.set(this.apiServiceSignal.getItemIdError()),
      error: () => this.statusItem.set(this.apiServiceSignal.getItemIdError())
    })
  }

  createItem(title: string) {
    console.log('INICIADO: CRIAÇÃO DE UM NOVO ITEM')
    this.apiServiceSignal.postItem(title).subscribe({
      next: () => this.statusCreatedItem.set(this.apiServiceSignal.getCreateError()),
      error: () => this.statusCreatedItem.set(this.apiServiceSignal.getCreateError())
    })
  }

  updateItem(id: string, title: string) {
    console.log('INICIADO: ATUALIZAÇÃO DE UM ITEM EXITENTE')
    this.apiServiceSignal.updateItem(id, title).subscribe({
      next: () => this.statusUpdatedItem.set(this.apiServiceSignal.getUpdatedItemError()),
      error: () => this.statusUpdatedItem.set(this.apiServiceSignal.getUpdatedItemError())
    })
  }

  deleteItem(id: string) {
    console.log('INICIADO: DELETAR UM ITEM EXISTENTE')
    this.apiServiceSignal.deleteItem(id).subscribe({
      next: () => this.statusDeletedItem.set(this.apiServiceSignal.getDeletedItemError()),
      error: () => this.statusDeletedItem.set(this.apiServiceSignal.getDeletedItemError())
    })
  }
}

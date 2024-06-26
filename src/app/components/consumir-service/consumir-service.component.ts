import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-consumir-service',
  standalone: true,
  imports: [],
  templateUrl: './consumir-service.component.html',
  styleUrl: './consumir-service.component.scss'
})
export class ConsumirServiceComponent implements OnInit{
  //-> Injeção de Dependência <-
  //forma antiga:
  // constructor(private apiService$: ApiService) {}
  //forma nova:
  private apiService = inject(ApiService)
   listItems: Array<{id: string, title: string}> = []

  ngOnInit(): void {
    this.apiService.httpListItems$().subscribe({
      next: (next) => {
        this.listItems = next
      },
      error: (error) => console.log(error),
      complete: () => console.log('Observable listItems$ foi completado')
    })
  }

}

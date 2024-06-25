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
  private apiService$ = inject(ApiService)

  ngOnInit(): void {
    console.log(this.apiService$.name)
  }

}

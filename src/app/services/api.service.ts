import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Task {
  id: string,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient)
  private ulr = environment.apiUlr

  public httpListItems$(): Observable<Task[]> {
    return this.http.get<Task[]>(this.ulr)
  }

}

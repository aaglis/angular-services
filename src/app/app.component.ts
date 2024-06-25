import { Component } from '@angular/core';
import { ConsumirServiceComponent } from './components/consumir-service/consumir-service.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConsumirServiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-services';
}

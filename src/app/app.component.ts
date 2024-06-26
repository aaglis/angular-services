import { Component } from '@angular/core';
import { ConsumirServiceComponent } from './components/consumir-service/consumir-service.component';
import { ConsumirServiceSignalComponent } from './components/consumir-service-signal/consumir-service-signal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConsumirServiceComponent, ConsumirServiceSignalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-services';
}

import { Component } from '@angular/core';
import {NavigationComponent} from "../../components/navigation/navigation.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavigationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}

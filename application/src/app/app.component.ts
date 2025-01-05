import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {MatIconRegistry} from "@angular/material/icon";
import {HttpClientUserService} from "./services/user/http-client-user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NgIf]
})
export class AppComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry, private userService: HttpClientUserService) {
  }

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}




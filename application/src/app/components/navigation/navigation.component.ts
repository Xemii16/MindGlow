import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatTabNav} from "@angular/material/tabs";
import {MatBadge} from "@angular/material/badge";
import {MatLine} from "@angular/material/core";
import {MatCardAvatar} from "@angular/material/card";
import {UserService} from "../../service/user/user.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {response} from "express";
import {JwtService} from "../../service/jwt/jwt.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatTabNav,
    MatBadge,
    MatLine,
    MatCardAvatar,
    NgIf,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ]
})
export class NavigationComponent implements OnInit {
  availableNavigationList: AvailableNavigationList = {
    teachers: false,
    pupils: false,
    requests: false
  }
  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.userService.getUserByToken().then(response => {
      if (response === null) return;
      if (response.role === 'ADMIN') {
        this.availableNavigationList.teachers = true;
        this.availableNavigationList.requests = true;
        this.availableNavigationList.pupils = true;
      }
      if (response.role === 'TEACHER') {
        this.availableNavigationList.pupils = true;
      }
    });
  }

  isCurrentRoute(route: string): boolean {
    if (route.endsWith('/**')) {
      return this.router.url.startsWith(route.replace('/**', ''));
    }
    return this.router.url === route;
  }

  logout() {
    this.jwtService.removeTokens();
    this.router.navigate(['/login']);
  }

  openDialog() {
    this.dialog.open(ChangePasswordDialogComponent)
  }
}

export interface AvailableNavigationList {
  teachers: boolean,
  pupils: boolean,
  requests: boolean
}

import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CssSN, SideNavigationComponent} from "./components/side-navigation/side-navigation.component";
import {CheckboxComponent} from "./components/checkbox/checkbox.component";
import {IconComponent, IconSize, IconWeight} from "./components/icon/icon.component";
import {LoginComponent} from "./page/login/login.component";
import {RedirectService} from "./service/redirect/redirect.service";
import {NgIf} from "@angular/common";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CheckboxComponent, IconComponent, SideNavigationComponent, LoginComponent, RouterLink, NgIf]
})
export class AppComponent implements OnInit {
    readyToRender: boolean = false;

    constructor(private redirectService: RedirectService, private iconRegistry: MatIconRegistry) {
    }

    ngOnInit(): void {
        this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
        this.redirectService.checkAuthorization().then(() => this.readyToRender = true);
    }
}




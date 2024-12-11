import {Component, OnInit} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {
    MatActionList,
    MatList,
    MatListItem,
    MatListItemAvatar,
    MatListItemIcon,
    MatListItemMeta,
    MatListItemTitle,
    MatListOption,
    MatSelectionList
} from "@angular/material/list";
import {MatInput} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridList} from "@angular/material/grid-list";
import {NgForOf, NgIf} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserService} from "../../service/user/user.service";
import {RouterLink} from "@angular/router";
import {UserResponse} from "../../service/user/response/user.response";

@Component({
    selector: 'app-requests',
    standalone: true,
    imports: [
        MatDivider,
        MatCheckbox,
        MatButton,
        MatFormField,
        MatSelect,
        MatOption,
        MatIcon,
        MatLabel,
        MatListItemMeta,
        MatPrefix,
        MatInput,
        ReactiveFormsModule,
        FormsModule,
        MatList,
        MatListItem,
        MatListItemTitle,
        MatGridList,
        MatActionList,
        MatListItemIcon,
        MatSelectionList,
        MatListOption,
        NgForOf,
        MatListItemAvatar,
        CdkVirtualForOf,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        NgIf,
        RouterLink
    ],
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {

    hasNext: boolean = true;
    users: UserResponse[] = [];
    currentPage: number = 0;
    startWith: FormControl = new FormControl('');

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        this.getUsers();
    }

    reloadPages() {
        this.currentPage = 0;
        this.users = [];
        this.getUsers();
    }

    loadMore() {
        if (!this.hasNext) return;
        this.getUsers();
    }

    private getUsers() {
        this.userService.getUsersWithPagination(false, this.startWith.value, this.currentPage, 50).then((response) => {
            this.currentPage++;
            this.hasNext = response?.hasNext ?? false;
            if (response === null) return;
            this.users.push(...response.users);
        });
    }
}
